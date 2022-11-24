const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

// auth
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
//DB
const mongoose = require("mongoose");
const DB = require('./db.config');
const itemModel = require('./models/item');
const userModel = require('./models/user');

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

//MongoDB connection
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log("Connected to MongoDB");
});


// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});