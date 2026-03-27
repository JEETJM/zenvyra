const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1657349226767-66c983d7df39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D",
      },
      filename: {
        type: String,
        default: "",
      },
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Trending",
        "Rooms",
        "Iconic City",
        "Mountains",
        "Castles",
        "Amazing Pools",
        "Arctic",
        "Farms",
        "Camping",
        "Beach",
        "Treehouse",
        "Camped",
        "Hotel",
        "Apartment",
        "Sunset",
        "Parking",
        "Wishlist",
        "Kitchen",
        "Location",
      ],
      default: "Trending",
      required: true,
    },

    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        default: [0, 0],
      },
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({
      _id: { $in: listing.reviews },
    });
  }
});

module.exports = mongoose.model("Listing", listingSchema);