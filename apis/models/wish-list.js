let mongoose = require('mongoose');

let wishListItemModel = mongoose.Schema({

  user_id: {
    type: String,
    required: "User Id is required"
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Item Id number is required",
    ref: 'Item'
  },
}, {
  collection: "wishListItems"
})


module.exports = mongoose.model('WishListItem', wishListItemModel)
