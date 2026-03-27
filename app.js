require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const session = require("express-session");
// const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");

const User = require("./models/user");
const listingsRouter = require("./Routes/listings.js");
const reviewsRouter = require("./Routes/review.js");
const userRouter = require("./Routes/user.js");
const ExpressError = require("./utils/ExpressError.js");

const dbUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/airbnb";

// --------------------
// BASIC APP CONFIG
// --------------------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// --------------------
// SESSION STORE
// --------------------
// const store = MongoStore.create({
//   mongoUrl: dbUrl,
//   crypto: {
//     secret: "mysupersecretcode",
//   },
//   touchAfter: 24 * 3600,
// });

// store.on("error", (err) => {
//   console.log("ERROR IN MONGO SESSION STORE:", err);
// });

// --------------------
// SESSION CONFIG
// --------------------
const sessionOptions = {
  // store,
  secret: process.env.SECERET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// --------------------
// PASSPORT CONFIG
// --------------------
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// --------------------
// LOCALS MIDDLEWARE
// --------------------
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user || null;
  next();
});

// --------------------
// HOME ROUTE
// --------------------
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// --------------------
// ROUTES
// --------------------
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// --------------------
// 404 HANDLER
// --------------------
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// --------------------
// GLOBAL ERROR HANDLER
// --------------------
app.use((err, req, res, next) => {
  console.log("===== GLOBAL ERROR =====");
  console.log(err);
  console.log("message =>", err && err.message);
  console.log("stack =>", err && err.stack);

  const { statusCode = 500 } = err;
  res.status(statusCode).render("error.ejs", { err });
});

// --------------------
// DB CONNECT + SERVER START
// --------------------
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => {
      console.log("Server is listening now on:", port);
    });
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });