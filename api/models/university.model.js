import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    website: {
      type: String,
      required: true,
    },
    overallRating: {
      type: Number,
      default: 0,
    },
    educationRating: {
      type: Number,
      default: 0,
    },
    facilityRating: {
      type: Number,
      default: 0,
    },
    socialRating: {
      type: Number,
      default: 0,
    },
    adminRating: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const University = mongoose.model("University", universitySchema);

export default University;
