import express from "express";
import { create, read } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/create", create);
router.post("/read", read);

export default router;
