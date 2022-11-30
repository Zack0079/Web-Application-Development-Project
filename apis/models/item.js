let mongoose = require('mongoose');
const { FLOAT } = require('sequelize');

let itemModel = mongoose.Schema({
  name: {
    type: String,
    default: "",
    trim: true,
    required: "Name is required"
  },
  type: {
    type: String,
    default: "",
    trim: true,
    required: "Type is required"
  },
  price: {
    type: Number,
    default: 0.00,
    required: "Price is required"
  },
  remain: {
    type: Number,
    required: "Remain number is required"
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  shop: {
    type: Number,
    required: "Shop is required"
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
  collection: "items"
})

module.exports = mongoose.model('Item', itemModel)