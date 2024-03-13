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
  }

  // Hash the password
  const hashedPassword = await bcryptjs.hash(password, 12);

  // Create a new user
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });

  // Save the user to the database
  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    next(error);
  }
};

// Sign in a user
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if all fields are provided
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    // Find the user by email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(401, "Wrong email or password"));
    }

    // Compare the hashed password in database with the provided password
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      next(errorHandler(401, "Wrong email or password"));
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
      .json(rest);
  } catch (error) {
    next(error);
  }
};
