import Review from "../models/review.model.js";
import University from "../models/university.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  const { content, universityId, education, facility, social, admin } =
    req.body;

  let review;

  if (
    !content ||
    !education ||
    !facility ||
    !social ||
    !admin ||
    content === "" ||
    education === "" ||
    facility === "" ||
    social === "" ||
    admin === ""
  ) {
    return next(errorHandler(400, "All fields are required."));
  }

  if (content.length < 20) {
    return next(errorHandler(400, "Review must be at least 20 characters."));
  }

  if (content.length > 500) {
    return next(errorHandler(400, "Review must be at most 500 characters."));
  }

  try {
    try {
      const review = new Review({
        content,
        universityId,
        education,
        facility,
        social,
        admin,
      });
      await review.save();
    } catch (error) {
      return next(
        errorHandler(500, "An error occured while saving the review.")
      );
    }

    const reviews = await Review.find({ universityId });
    const totalEducationRating = reviews.reduce(
      (sum, review) => sum + review.education,
      0
    );
    const totalFacilityRating = reviews.reduce(
      (sum, review) => sum + review.facility,
      0
    );
    const totalSocialRating = reviews.reduce(
      (sum, review) => sum + review.social,
      0
    );
    const totalAdminRating = reviews.reduce(
      (sum, review) => sum + review.admin,
      0
    );

    const averageEducationRating = totalEducationRating / reviews.length;
    const averageFacilityRating = totalFacilityRating / reviews.length;
    const averageSocialRating = totalSocialRating / reviews.length;
    const averageAdminRating = totalAdminRating / reviews.length;

    const university = await University.findById(universityId);
    university.educationRating = averageEducationRating;
    university.facilityRating = averageFacilityRating;
    university.socialRating = averageSocialRating;
    university.adminRating = averageAdminRating;
    university.totalRatings = reviews.length;
    university.overallRating =
      (averageEducationRating +
        averageFacilityRating +
        averageSocialRating +
        averageAdminRating) /
      4;
    await university.save();

    res.status(202).json({
      success: true,
      message: "Review saved successfully.",
      review,
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
    const reviews = await Review.find({
      ...(req.query.universityId && { universityId: req.query.universityId }),
      ...(req.query.searchTerm && {
        content: { $regex: req.query.searchTerm, $options: "i" },
      }),
    })
      .sort({ createdAt: sortDirection })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
