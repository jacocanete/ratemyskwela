import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";

const router = express.Router();

// localhost:3000/api/auth/signup
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

export default router;
