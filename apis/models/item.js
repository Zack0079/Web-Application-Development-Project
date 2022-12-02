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
    default:0,
    required: "Remain number is required"
  },
  Sold: {
    type: Number,
    default:0,
    required: true
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  shop: {
    type: String,
    required: "Shop is required"
  },
  status: {
    type: Number,
    default:1,
    required: "Required"
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