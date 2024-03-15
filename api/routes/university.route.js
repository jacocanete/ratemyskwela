import express from "express";
import {
  create,
  getUniversities,
} from "../controllers/university.controller.js";

const router = express.Router();

router.post("/create", create);
router.get("/read", getUniversities);

export default router;
