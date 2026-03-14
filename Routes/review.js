const express = require("express");
// const router = express.Router();
const router = express.Router({ mergeParams: true });

// wrap Async equire
const WrapAsync = require("../utils/WrapAsync.js");
//ExpressError require *************
const ExpressError = require("../utils/ExpressError.js");

//FOR JOI SCHEMA FILE REQUIRE.               ..................
const { listingSchema, reviewSchema } = require("../Schema.js");
//require listings by models
const Listing = require("../models/listing.js");
//fORSTORE REVIEW .
const Review = require("../models/review.js");

// function for  check REVIEW  comment---------------------------------------------------
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  // console.log(resultt);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else next();
};

// ................all post reviews .
router.post(
  "/",
  validateReview,
  WrapAsync(async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    const newReview = new Review(req.body.review);

    await newReview.save();

    listing.reviews.push(newReview);

    await listing.save();
    req.flash("success", "New Review Created !");

    res.redirect(`/listings/${id}`);
  }),
);

// =============================all reviews delete
router.delete(
  "/:reviewId",
  WrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });

    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");

    res.redirect(`/listings/${id}`);
  }),
);

module.exports = router;
