const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
image: {
  url: {
    type: String,
    required: true,
  },
},
price: {
  type: Number,
  required: true,
},
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const listening = mongoose.model("listening", listingSchema);
module.exports = listening;
