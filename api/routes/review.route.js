import express from "express";
import { create, read } from "../controllers/review.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, create);
router.post("/read", read);

export default router;
