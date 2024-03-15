import University from "../models/university.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    return next(errorHandler(400, "Title and description are required."));
  }
  if (!req.body.location) {
    return next(errorHandler(400, "Location is required."));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const newUniversity = new University({
    ...req.body,
    slug,
  });

  try {
    const university = await newUniversity.save();
    res.status(201).json({
      success: true,
      university,
    });
  } catch (error) {
    next(error);
  }
};

export const read = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const universities = await University.find({
      ...(req.query.location && { location: req.query.location }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ averageRating: sortDirection })
      .limit(limit)
      .skip(startIndex);

    const totalUniversities = await University.countDocuments();

    res.status(200).json({
      success: true,
      universities,
      totalUniversities,
    });
  } catch (error) {
    next(error);
  }
};
