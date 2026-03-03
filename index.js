const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const path = require("path");
// const methodOverride = require("method-override");
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
//server port .
app.listen(port, () => {
  console.log("Server is listening now on :", port);
});

//create a  basic home root .
app.get("/",async (req, res) => {
  const allListings = await Listing.find({});
  // res.send(allListings);
  res.render("./listings/index.ejs", { allListings });
});

//create a testing Listining .
// app.get("/testListing", async (req, res) => {
//   // console.log("Perfect !! Root is Working . ");
//   // res.send("ok done Response is Working !");
//   let samplelisting = new Listing({
//     title: "Most luxurious experience at this price",
//     description:
//       "This is not an ordinary AirBnB; not spare space, but a labor of love, built with passion, energy and splashes of creativity, constructed to give you a new lease of life. This is an extremely spacious studio apartment chock full of state-of-the-art amenities and a bathroom with  all modern fittings. What we pride ourselves on, however, is the aesthetics that this place is imbued with, the luxury and relaxation it offers and the terrace that makes hearts flutter; a sanctuary tailor-made for you . ",
//     Price: 1940 ,
//     location: "Kolkata",
//     country: "INDIA",

//   });
//   await samplelisting.save();
//   console.log("Sample Was Saved !");
//   res.send("Sucessfull Testing !!");
// });

//INDEX ROUTE . ..
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  // res.send(allListings);
  res.render("./listings/index.ejs", { allListings });
});

//NEW ROUTE !!
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

//SHOW ROUTE  .
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing });
});

// app.get("/listings", async (req, res) => {
//   // let{title,description,image,price,country,location} =
//   const newlisting = new Listing(req.body.listing);
//   await newlisting.save();
//   res.redirect("/listings");
// });

//Craete ROUTE .

app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//EDIT  ROUTE. ..
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/edit.ejs", { listing });
});

//UPDATE ROUTE .................
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});
//DELETE ROUTE . .
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;

  await Listing.findByIdAndDelete(id);

  res.redirect("/listings");
});





//connect dataabse .
let mongo_url = "mongodb://127.0.0.1:27017/AIRBNB";
async function main() {
  await mongoose.connect(mongo_url);
}
// call the main function .
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("NOT to reach th DB Error is : ", err);
  });
