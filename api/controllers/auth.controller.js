import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

// Signup a new user
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  } else {
    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const placeholderInitials = username[0].toUpperCase();

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      initials: placeholderInitials,
    });

    // Create a JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Separate password from the rest of the user data
    const { password: pass, ...rest } = newUser._doc;

    // Save the user to the database
    try {
      await newUser.save();
      res
        .status(201)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json({
          success: true,
          message: "Signup successful",
          ...rest,
        });
    } catch (error) {
      next(error);
    }
  }
};

// Sign in a user
export const signin = async (req, res, next) => {
  const { email, username, password } = req.body;

  // Check if all fields are provided
  if ((!email && !username) || !password || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    // Find the user by email or username
    const validUser = await User.findOne({ $or: [{ email }, { username }] });
    if (!validUser) {
      return next(errorHandler(401, "Invalid email/username or password"));
    }

    // Compare the hashed password in database with the provided password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid email/username or password"));
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        userId: validUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Separate password from the rest of the user data
    const { password: pass, ...rest } = validUser._doc;

    // Send the token and the rest of the user data
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest)
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findOne({email});
    if (user) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword = 
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 12);
      const placeholderInitials = name[0].toUpperCase();
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        // Jaco Canete => jacocanete
        email,
        password: hashedPassword,
        initials: placeholderInitials,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          userId: newUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(201)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};