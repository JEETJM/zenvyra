const Listing = require("../models/listing");
const uploadToCloudinary = require("../utils/cloudUpload");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({
  accessToken: mapToken,
});

// ==========================
// FORWARD GEOCODING FUNCTION
// ==========================
async function getCoordinatesFromLocation(location, country) {
  const fullLocation = `${location}, ${country}`;

  const response = await geocodingClient
    .forwardGeocode({
      query: fullLocation,
      limit: 1,
    })
    .send();

  if (
    response.body.features &&
    response.body.features.length > 0
  ) {
    return response.body.features[0].geometry.coordinates;
  }

  return null;
}

// ==========================
// REVERSE GEOCODING FUNCTION
// ==========================
async function getPlaceFromCoordinates(longitude, latitude) {
  const response = await geocodingClient
    .reverseGeocode({
      query: [longitude, latitude],
      limit: 1,
    })
    .send();

  if (
    response.body.features &&
    response.body.features.length > 0
  ) {
    return response.body.features[0].place_name;
  }

  return null;
}

// ==========================
// INDEX
// ==========================
module.exports.index = async (req, res) => {
  const { category } = req.query;

  let allListings;
  let selectedCategory = "";

  if (category && category !== "All") {
    allListings = await Listing.find({ category });
    selectedCategory = category;
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index.ejs", {
    allListings,
    selectedCategory,
  });
};

// ==========================
// NEW FORM
// ==========================
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// ==========================
// SHOW LISTING
// ==========================
module.exports.showListings = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate("author")
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", {
    listing,
    mapToken,
  });
};

// ==========================
// SEARCH LISTINGS
// ==========================
module.exports.searchListings = async (req, res) => {
  const { query } = req.query;

  const listings = await Listing.find({
    $or: [
      { location: { $regex: query, $options: "i" } },
      { country: { $regex: query, $options: "i" } },
      { title: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
    ],
  });

  res.render("listings/index.ejs", {
    allListings: listings,
    selectedCategory: "",
    query: query || "",
  });
};

// ==========================
// CREATE LISTING
// ==========================
module.exports.createListings = async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);

    // Forward geocoding
    const coordinates = await getCoordinatesFromLocation(
      req.body.listing.location,
      req.body.listing.country
    );

    if (!coordinates) {
      req.flash("error", "Invalid location. Please enter a valid place.");
      return res.redirect("/listings/new");
    }

    console.log("Create Listing Coordinates:", coordinates);

    newListing.geometry = {
      type: "Point",
      coordinates: coordinates,
    };

    // Reverse geocoding test output
    const reversePlace = await getPlaceFromCoordinates(
      coordinates[0],
      coordinates[1]
    );
    console.log("Reverse Geocoding Place:", reversePlace);

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      newListing.image = {
        url: result.secure_url,
        filename: result.public_id,
      };
    }

    newListing.author = req.user._id;

    await newListing.save();

    req.flash("success", "New Listing Created Successfully!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
    next(err);
  }
};

// ==========================
// EDIT FORM
// ==========================
module.exports.editListings = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { listing });
};

// ==========================
// UPDATE LISTING
// ==========================
module.exports.updateListings = async (req, res, next) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true, runValidators: true }
    );

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Forward geocoding on updated location
    const coordinates = await getCoordinatesFromLocation(
      req.body.listing.location,
      req.body.listing.country
    );

    if (!coordinates) {
      req.flash("error", "Invalid updated location. Please enter a valid place.");
      return res.redirect(`/listings/${id}/edit`);
    }

    console.log("Update Listing Coordinates:", coordinates);

    listing.geometry = {
      type: "Point",
      coordinates: coordinates,
    };

    // Reverse geocoding test output
    const reversePlace = await getPlaceFromCoordinates(
      coordinates[0],
      coordinates[1]
    );
    console.log("Reverse Geocoding Place:", reversePlace);

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      listing.image = {
        url: result.secure_url,
        filename: result.public_id,
      };
    }

    await listing.save();

    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
};

// ==========================
// DELETE LISTING
// ==========================
module.exports.deleteListings = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};