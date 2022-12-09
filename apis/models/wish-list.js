let mongoose = require('mongoose');

const wishListItemModel = mongoose.Schema({

  user_id: {
    type: String,
    required: "User Id is required"
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Item Id number is required",
    ref: 'Item'
  },
  quantify: {
    type: Number,
    required: true,
    default: 1,
  },
}, {
  collection: "wishListItems"
})

module.exports = mongoose.model('WishListItem', wishListItemModel)
