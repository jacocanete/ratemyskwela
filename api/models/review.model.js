import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
    },
    {timestamps: true}
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;