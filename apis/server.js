const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require('cors')

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

let corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

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


// get items list api
app.get("/items", (req, res) => {
  itemModel.find((err, list) => {
    if (err) {
      console.log(err)
      res.json(err.message)
    } else {
      res.json(list)
    }
  })
});

// get item list api
app.get("/item/:id", (req, res) => {
  let itemId = req.params.id;

  itemModel.findById(itemId, (err, item) => {
    if (err) {
      console.log(err)
      res.json(err.message)
    } else {
      res.json(item)
    }
  })
});

// add item api
app.post("/item", (req, res) => {
  let item = itemModel({
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    remain: req.body.remain,
    description: req.body.description,
  })

  itemModel.create(item, (err, result) => {
    if (err) {
      console.log(err)
      res.json(err.message)
    } else {
      res.json(result)
    }
  })
});

// update item api
app.post("/item/:id", (req, res) => {
  let itemID = req.params.id;

  let item = itemModel({
    _id: itemID,
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    remain: req.body.remain,
    description: req.body.description,
  })

  itemModel.create(item, (err, result) => {
    if (err) {
      console.log(err)
      res.json(err.message)
    } else {
      res.json(result)
    }
  })
});

// update item remain number api
app.post("/item/:id/remain", (req, res) => {
  let itemID = req.params.id;

  itemModel.findOneAndUpdate({ _id: itemID }, { "$inc": { "remain": -req.body.subtract } }, (err, result) => {
    if (err) {
      console.log(err)
      res.json(err.message)
    } else {
      res.json(result)
    }
  })
});

// delete item number api
app.post("/item/:id/delete", (req, res) => {
  let itemID = req.params.id;

  itemModel.remove({ _id: itemID }, (err) => {
    if (err) {
      console.log(err)
      res.json(err.message)
    } else {
      res.json("success")
    }
  })
});


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});