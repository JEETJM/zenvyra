# 🚀 Zenvyra – Full Stack Rental Listing Platform

# 🚀 Zenvyra – Full Stack Rental Listing Platform <p align="center"> <img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" width="600"/> </p> <p align="center"> <img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=28&duration=4000&color=00F7FF&center=true&vCenter=true&width=800&lines=Full+Stack+Airbnb+Clone;Node.js+%7C+MongoDB+%7C+Express;Cloudinary+%2B+Mapbox+Integration;Beautiful+UI+%2B+Animations" /> </p> <p align="center"> [![HTML](https://img.shields.io/badge/HTML5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)](#) [![CSS](https://img.shields.io/badge/CSS3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)](#) [![JavaScript](https://img.shields.io/badge/JavaScript-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](#) [![Bootstrap](https://img.shields.io/badge/Bootstrap-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white)](#) [![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](#) [![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](#) [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](#) [![EJS](https://img.shields.io/badge/EJS-Template-yellow?style=for-the-badge)](#) [![Render](https://img.shields.io/badge/Render-Deploy-black?style=for-the-badge&logo=render&logoColor=white)](#) </p>

<p align="center">
<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=30&duration=4000&color=00F7FF&center=true&vCenter=true&width=900&lines=Full+Stack+Airbnb+Clone;Node.js+%7C+MongoDB+%7C+Express;Cloudinary+%2B+Mapbox+Integration;Advanced+Authentication+%2B+Security;Beautiful+UI+%2B+Animations" />
</p>

---

## 🌐 Live Demo

🔗 https://zenvyra-app.onrender.com

## 📦 GitHub Repository

🔗 https://github.com/JEETJM/zenvyra

---

## 🌟 Project Overview

**Zenvyra** is a **feature-rich full-stack rental listing platform** inspired by Airbnb.

It allows users to:

* Discover rental properties 🌍
* Create & manage listings 🏠
* Upload images ☁️
* Leave reviews ⭐
* Explore locations via interactive maps 🗺️

⚡ Built with a **scalable MVC architecture**, ensuring clean code and maintainability.

---

## 🎯 Advanced Features (Detailed)

### 🏠 1. Listing Management System

* Create new listings with full details
* Update existing listings
* Delete listings securely
* Dynamic rendering of listings
* Server-side validation (Joi)

```js
// Example: Create Listing
router.post("/", isLoggedIn, validateListing, async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.author = req.user._id;
  await newListing.save();
  res.redirect("/listings");
});
```

---

### ⭐ 2. Review System

* Add reviews to listings
* Delete reviews by owner
* Rating-based feedback system
* Relational linking (Listing ↔ Reviews)

```js
// Example: Add Review
router.post("/", isLoggedIn, async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;

  listing.reviews.push(review);
  await review.save();
  await listing.save();
});
```

---

### 👤 3. Authentication & Authorization

* Secure login/signup system
* Passport.js Local Strategy
* Session-based authentication
* Protected routes (middleware)
* Role-based access (optional extension)

```js
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
```

---

### 🖼️ 4. Image Upload System (Cloudinary + Multer)

* Upload images from frontend
* Store in Cloudinary
* Save image URL + filename in DB
* Optimized image handling

```js
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Zenvyra/listings",
  },
});
```

---

### 🗺️ 5. Map Integration (Mapbox)

* Display location on map
* Marker popup with listing details
* Forward & reverse geocoding

```js
mapboxgl.accessToken = MAP_TOKEN;
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
});
```

---

### 🔍 6. Search & Filtering System

* Search by:

  * Title
  * Location
  * Country
* Dynamic filtering logic
* Scalable for categories (future)

---

### 🎨 7. UI / UX (Premium Design)

* Fully responsive design 📱
* Dark / Light mode toggle 🌙
* Animated buttons & cards
* Smooth transitions
* Clean modern layout

---

### ⚡ 8. Backend Architecture

* MVC pattern
* Modular routing
* Custom middleware
* Centralized error handling
* Async wrapper (WrapAsync)

```js
module.exports = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};
```

---

### 🔐 9. Security Features

* Password hashing & salting
* Session management
* Secure cookies
* Input validation (Joi)
* Protection against invalid requests

---

## 🛠️ Tech Stack

### 💻 Frontend

* HTML5
* CSS3 (Animations)
* JavaScript
* Bootstrap
* EJS

### ⚙️ Backend

* Node.js
* Express.js

### 🗄️ Database

* MongoDB
* Mongoose

### 🔐 Authentication

* Passport.js
* express-session

### ☁️ Services

* Cloudinary
* Mapbox
* Render

---

## 📂 Project Structure (Detailed)

```bash
zenvyra/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── Routes/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── views/
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new.ejs
│   │   └── edit.ejs
│   │
│   ├── reviews/
│   ├── users/
│   ├── includes/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   │
│   └── layouts/
│
├── public/
│   ├── css/
│   └── js/
│
├── uploads/
├── utils/
├── init/
│
├── app.js
├── middleware.js
├── cloudConfig.js
├── Schema.js
├── .env
└── package.json
```

---

## ⚙️ Installation Guide

```bash
git clone https://github.com/JEETJM/zenvyra.git
cd zenvyra
npm install
```

---

## 🔐 Environment Variables

```env
MONGO_URL=your_mongodb_url
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_key
CLOUD_API_SECRET=your_secret
MAP_TOKEN=your_mapbox_token
SESSION_SECRET=your_secret
```

---

## ▶️ Run Project

```bash
npm run dev
```

or

```bash
node app.js
```

---

## 🚀 Future Enhancements

* ❤️ Wishlist system
* 🏨 Booking system
* 💳 Payment gateway
* 🧑‍💻 Admin dashboard
* 💬 Real-time chat
* 📊 Analytics dashboard

---

## 👨‍💻 Author

**Jeet Mondal**

* GitHub: https://github.com/JEETJM
* Email: [jm382118@gmail.com](mailto:jm382118@gmail.com)
* Twitter: https://x.com/jm382118
* Telegram: https://t.me/jeetu900

---

## 💙 Support

⭐ Star this repo
🍴 Fork it
📢 Share it

---

<p align="center">
🔥 Built with Passion by JEET MONDAL 🔥
</p>
