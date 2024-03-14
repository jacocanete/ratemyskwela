import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signout = (req, res, next) => {
    try{
        res
        .clearCookie("access_token")
        .status(200)
        .json("User signed out successfully");

    } catch(error){
        next(error);
    }
};