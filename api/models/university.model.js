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
    },
    { timestamps: true }
);

const University = mongoose.model("University", universitySchema);

export default University;