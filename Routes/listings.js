const express = require("express");
const router = express.Router();
//require listings by models
const Listing = require("../models/listing.js");
// wrap Async equire
const WrapAsync = require("../utils/WrapAsync.js");
//ExpressError require *************
const ExpressError = require("../utils/ExpressError.js");
//FOR JOI SCHEMA FILE REQUIRE.               ..................
const { listingSchema, reviewSchema } = require("../Schema.js");
// ExpressError require *************
// const ExpressError = require("../utils/ExpressError.js");






// function for  check validate listings-------------------------------------------++++++++++++++++++++++++++++++++++++++--------
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  // console.log(resultt);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else next();
};



// SEARCH ROUTE
router.get(
  "/search",
  WrapAsync(async (req, res) => {
    let { query } = req.query;

    const listings = await Listing.find({
      $or: [
        { location: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
      ],
    });

    res.render("./listings/index.ejs", {
      allListings: listings,
      query: query,
    });
  })
);







// //create a  basic home root .
// router.get("/", async (req, res) => {
//   const allListings = await Listing.find({});
//   // res.send(allListings);
//   res.render("./listings/index.ejs", { allListings });
// });


//INDEX ROUTE . ..
router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("./listings/index.ejs", { allListings });
});

//NEW ROUTE !!
router.get("/new", (req, res) => {
  res.render("./listings/new.ejs");
});

//SHOW ROUTE
router.get(
  "/:id",
  WrapAsync(async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id).populate("reviews");

    res.render("./listings/show.ejs", { listing });
  }),
);

//Craete ROUTE .

router.post(
  "/",
  validateListing,
  WrapAsync(async (req, res, next) => {
    let resultt = listingSchema.validate(req.body);
    console.log(resultt);
    if (resultt.err) {
      throw new ExpressError(400, resultt.err);
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }),
);

//EDIT  ROUTE. ..
router.get(
  "/:id/edit",
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
  }),
);

//UPDATE ROUTE .................
router.put(
  "/:id",
  validateListing,
  WrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }),
);
//DELETE ROUTE . .
router.delete(
  "/:id",
  WrapAsync(async (req, res) => {
    let { id } = req.params;

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
  }),
);

module.exports = router;
