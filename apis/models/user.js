let mongoose = require('mongoose');
let userModel = mongoose.Schema({
  username: {
    type: String,
    default: "",
    trim: true,
    unique: true,
    required: "username is required"
  },
  password: {
    type: String,
    default: "",
    trim: true,
    required: "password is required"
  },
  email: {
    type: String,
    default: "",
    trim: true,
    unique: true,
    required: "email address is required"
  },
  displayName: {
    type: String,
    default: "",
    trim: true,
    required: "full name name is required"
  },
  role: {
    type: Number,
    default: 3, //1 is admin, 2 is shop, 3 is customer 
    required: true
  },
  address: {
    type: String,
    default: "", 
  },
  recipient: {
    type: String,
    default: "",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
}, {
  collection: "users"
})

module.exports.User = mongoose.model("User", userModel)