import express from "express";
import { create, read } from "../controllers/university.controller.js";

const router = express.Router();

router.post("/create", create);
router.get("/read", read);

export default router;
