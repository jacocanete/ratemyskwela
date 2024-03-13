import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import { error } from "console";
import authRoutes from "./routes/auth.route.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// Create an Express app
const app = express();

app.use(express.json());

// Add middleware for JSON parsing
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Add middleware for JSON parsing
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
