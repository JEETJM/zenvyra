# Airbnb Clone Project

A full-stack Airbnb-inspired web application built using **Node.js, Express.js, MongoDB, and EJS**.  
This project allows users to browse listings, add new listings, view listing details, and manage reviews.

> **Note:** This is an educational/demo project inspired by Airbnb and is not affiliated with Airbnb.

---

## Live Demo

🔗 Live Website: https://airbnb-al4a.onrender.com

---

## GitHub Repository

🔗 GitHub Repo: https://github.com/JEETJM/airbnb

---

## Project Overview

This project is a complete Airbnb-style listing platform where users can:

- View all listings
- View a single listing in detail
- Add new listings
- Edit listings
- Delete listings
- Add reviews
- Delete reviews
- Explore listing cards with image, price, and location
- Experience full CRUD functionality

This project was built for learning full-stack web development and deployment.

---

## Features

### Listing Features
- Show all listings
- Add new listing
- Edit existing listing
- Delete listing
- View detailed listing page

### Review Features
- Add review to a listing
- Delete review
- Store reviews in MongoDB

### UI Features
- Responsive navbar
- Clean cards layout
- Footer section
- EJS templating
- Method override support for PUT and DELETE requests

### Backend Features
- RESTful routing
- MongoDB database integration
- Mongoose schema/model usage
- Error handling middleware
- Custom Express error class
- Async error wrapper
- Route modularization

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- EJS
- Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Deployment
- Render
- MongoDB Atlas

---

## Packages / Dependencies Used

The following npm packages are used in this project:

- express
- mongoose
- ejs
- ejs-mate
- method-override
- joi

---

## Folder Structure

```bash
airbnb/
│── models/
│   ├── listing.js
│   └── review.js
│
│── Routes/
│   ├── listings.js
│   └── review.js
│
│── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── error.ejs
│
│── public/
│   ├── css/
│   └── js/
│
│── utils/
│   ├── ExpressError.js
│   └── WrapAsync.js
│
│── init/
│   ├── data.js
│   └── index.js
│
│── app.js
│── package.json
│── package-lock.json
│── README.md
