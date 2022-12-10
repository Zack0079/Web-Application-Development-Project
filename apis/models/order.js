let mongoose = require('mongoose');

let orderItemModel = mongoose.Schema({
  order_id:{
    type: String,
    required: "Order Id is required"
  },
  user_id: {
    type: String,
    required: "User Id is required"
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Item Id number is required",
    ref: 'Item'
  },
  item_name: {
    type: String,
    required: "Item name is required",
    default: ""
  },
  quantify: {
    type: Number,
    required: true,
    default: 1,
  },
  price:{
    type: Number,
    default: 0.00,
    required: "Price is required"
  },
  created: {
    type: Date,
    default: Date.now(),
  }
}, {
  collection: "orderItems"
})


module.exports = mongoose.model('OrderItem', orderItemModel)
