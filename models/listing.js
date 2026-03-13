// const mongoose = require("mongoose");
// const review = require("./review");
const { ref } = require("joi");
// const Schema = mongoose.Schema;
// const listingSchema = new Schema({
//   title: {
//     type: String,
//     // required: true,
//   },
//   description: String,
//   image: {
//     url: {
//       type: String,
//       // required: true,
//     },
//   },
//   price: {
//     type: Number,
//     // required: true,
//   },
//   location: {
//     type: String,
//     // required: true,
//   },
//   country: {
//     type: String,
//     // required: true,
//   },
//   review: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "reviews",
//     },
//   ],
// });

// const listening = mongoose.model("listening", listingSchema);
// module.exports = listening;

const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: String,
  description: String,

  image: {
    url: String,
  },

  price: Number,
  location: String,
  country: String,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({
      _id: { $in: listing.reviews },
    });
  }
});

module.exports = mongoose.model("Listing", listingSchema);