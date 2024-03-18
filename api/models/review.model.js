import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    universityId: {
      type: String,
      required: true,
    },
    education: {
      type: Number,
      required: true,
      default: 0,
    },
    facility: {
      type: Number,
      required: true,
      default: 0,
    },
    social: {
      type: Number,
      required: true,
      default: 0,
    },
    admin: {
      type: Number,
      required: true,
      default: 0,
    },
    overallRating: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
