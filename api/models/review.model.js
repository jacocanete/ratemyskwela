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
        userId: {
            type: String,
            required: true,
        },
        education: {
            type: Number,
            required: true,
            default: 0,
        },
        facilities: {
            type: Number,
            required: true,
            default: 0,
        },
        social: {
            type: Number,
            required: true,
            default: 0,
        },
        food: {
            type: Number,
            required: true,
            default: 0,
        },
        location: {
            type: Number,
            required: true,
            default: 0,
        },
        safety: {
            type: Number,
            required: true,
            default: 0,
        },
        admin: {
            type: Number,
            required: true,
            default: 0,
        },
        sports: {
            type: Number,
            required: true,
            default: 0,
        },
        clubs: {
            type: Number,
            required: true,
            default: 0,
        },
        internet: {
            type: Number,
            required: true,
            default: 0,
        },
        happiness: {
            type: Number,
            required: true,
            default: 0,
        },
        difficulty: {
            type: Number,
            required: true,
            default: 0,
        },
        workload: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {timestamps: true}
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;