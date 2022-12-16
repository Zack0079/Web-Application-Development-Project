const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http');
const https = require('https')
// auth
const session = require('express-session');
const passport = require('passport');

//DB
const DB = require('./db');
const auth = require('./auth-service');

const itemModel = require('./models/item');
const userModel = require('./models/user');
const wishListItemModel = require('./models/wish-list');
const orderItemModel = require('./models/order');

const app = express();

let corsOptions = {
  origin: "https://sixber-website.s3-website.us-east-2.amazonaws.com/"
};

app.use(cors(corsOptions));


// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// get items list api
app.get("/items", (req, res) => {
  itemModel.find({ status: 1 , remain:{$gt: 0,}}, (err, list) => {
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
  let price = req.query.price;

  itemModel.findById(itemId, (err, item) => {
    if (err) {
      console.log(err)
      res.json(err.message)
    } else {
      if (price === "true") {
        res.json(item.price)
      } else {
        res.json(item)
      }
    }
  })
});

// get shop product list
app.get("/shop/:shopId/items", passport.authenticate("jwt", { session: false }), (req, res) => {
  let shopId = req.params.shopId;

  return new Promise((resolve, reject) => {
    itemModel.find({ shop: shopId, status: 1 }, (err, list) => {
      if (err) {
        console.log(err)
        reject(res.status(500).json({ errMsg: err }));
      } else {
        resolve(res.json(list))
      }
    })
  }).catch(err => {
    res.status(500).json({ errMsg: err });
  })
});

//get wish list item
app.get("/:userId/wish-list", passport.authenticate("jwt", { session: false }), (req, res) => {
  let id = req.params.userId;
  return new Promise((resolve, reject) => {
    wishListItemModel.find({ user_id: id }).populate('item_id')
      .exec((err, list) => {
        if (err) {
          console.log(err)
          reject(res.status(500).json({ errMsg: err }));
        } else {
          resolve(res.json(list))
        }
      })
  }).catch(err => {
    res.status(500).json({ errMsg: err });
  })
});

// add item api 
app.post("/item", passport.authenticate("jwt", { session: false }), (req, res) => {
  let item = itemModel({
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    remain: req.body.remain,
    sold: 0,
    shop: req.body.shop,
    status: req.body.status ? req.body.status : 1,
    description: req.body.description,
  })
  return new Promise((resolve, reject) => {
    itemModel.create(item, (err, result) => {
      if (err) {
        console.log(err)
        reject(res.status(500).json({ errMsg: err }));
      } else {
        resolve(res.json({ msg: "create successful", item: result }))
      }
    })
  }).catch(err => {
    res.status(500).json({ errMsg: err });
  })
});

// update item api
app.post("/item/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  let itemID = req.params.id;

  let item = itemModel({
    _id: itemID,
    name: req.body.name,
    type: req.body.type,
    price: req.body.price,
    remain: req.body.remain,
    status: req.body.status ? req.body.status : 1,
    description: req.body.description,
  })
  return new Promise((resolve, reject) => {
    itemModel.updateOne({ _id: itemID }, item, (err, result) => {
      if (err) {
        console.log(err)
        reject(res.status(500).json({ errMsg: err }));
      } else {
        resolve(res.json({ msg: "update successful", item: result }))
      }
    })
  }).catch(err => {
    res.status(500).json({ errMsg: err });
  })
});

// update item remain number api
app.post("/item/:id/remain", passport.authenticate("jwt", { session: false }), (req, res) => {
  let itemID = req.params.id;
  console.log(req.body)
  return new Promise((resolve, reject) => {

    itemModel.findOneAndUpdate({ _id: itemID }, { "$inc": { "remain": -req.body.sold, "sold": +req.body.sold } }, (err, result) => {
      if (err) {
        console.log(err)
        reject(res.status(500).json({ errMsg: err }));
      } else {
        resolve(res.json({ msg: "sold successful", itemID: itemID }))
      }
    })
  }).catch(err => {
    res.status(500).json({ errMsg: err });
  })
});

// delete item number api
app.post("/item/:id/delete", passport.authenticate("jwt", { session: false }), (req, res) => {
  let itemID = req.params.id;
  return new Promise((resolve, reject) => {
    itemModel.updateOne({ _id: itemID }, { _id: itemID, status: 2 }, (err, result) => {
      if (err) {
        console.log(err)
        reject(res.status(500).json({ errMsg: err }));
      } else {
        resolve(res.json({ msg: "update successful", item: result }))
      }
    })
  })

});

app.post("/item/:id/wishList", passport.authenticate("jwt", { session: false }), (req, res) => {
  let item_id = req.params.id;
  let user_id = req.body.user_id;

  let item = {
    user_id: user_id,
    item_id: item_id,
  }
  return new Promise((resolve, reject) => {
    wishListItemModel.findOne(item, (err, result) => {
      if (err) {
        console.log(err)
        reject(res.status(500).json({ errMsg: err }));
      }
      if (result) {
        result.quantify += 1;
        return result.save(function (err, item) {
          if (err) {
            reject(res.status(500).json({ errMsg: err }));
          }
          if (item) {
            resolve(res.json({ msg: "Update wishList item successful", item: item }))
          }
        });
      } else {
        return wishListItemModel.create(wishListItemModel(item)).then(item => {
          resolve(res.json({ msg: "create wishList item successful", item: item }))
        })
      }
    })
  }).catch(err => {
    res.status(500).json({ errMsg: err });
  })
});


app.post("/item/:id/wishList/update", passport.authenticate("jwt", { session: false }), (req, res) => {
  let item_id = req.params.id;
  let user_id = req.body.user_id;

  let updateItem = {
    user_id: user_id,
    item_id: item_id,
  }
  console.log(req.body)
  return new Promise((resolve, reject) => {
    wishListItemModel.findOneAndUpdate(updateItem, { "quantify": req.body.quantify }, (err, result) => {
      if (err || !result) {
        console.log(err)
        reject(res.status(500).json({ errMsg: err }));
      } else {
        resolve(res.json({ msg: "update wishList item successful", item: result }))
      }
    })
  }).catch(err => {
    res.status(500).json({ errMsg: err });
  })
});


app.post("/item/:id/wishList/delete", passport.authenticate("jwt", { session: false }), (req, res) => {
  let item_id = req.params.id;
  let user_id = req.body.user_id;

  let removeObj = {
    user_id: user_id,
    item_id: item_id,
  }

  return new Promise((resolve, reject) => {
    wishListItemModel.deleteOne(removeObj, (err, result) => {
      if (err) {
        console.log(err)
        reject(res.status(500).json({ errMsg: err }));
      } else {
        resolve(res.json({ msg: "Delete successful" }))
      }
    })
  }).catch(err => {
    res.status(500).json({ errMsg: err });
  })
});

app.post("/order", passport.authenticate("jwt", { session: false }), (req, res) => {
  let list = req.body;
  console.log("order")

  return new Promise((resolve, reject) => {
    orderItemModel.create(list, (err, result) => {
      console.log("result:", result)
      if (err) {
        console.log(err)
        reject(res.status(500).json({ errMsg: err }));
      } else {
        resolve(res.json({ msg: "Create Order successful" }))
      }
    })
  }).catch(err => {
    res.status(500).json({ errMsg: err });
  })
});

app.get("/order/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  let user_id = req.params.id;

  return new Promise((resolve, reject) => {
    orderItemModel.find({ user_id: user_id })
      .sort([['order_id', -1], ['created', -1]])
      .exec((err, result) => {
        if (err) {
          console.log(err)
          reject(res.status(500).json({ errMsg: err }));
        } else {
          resolve(res.json({ msg: "Get Order successful", result: result }))
        }
      })
  }).catch(err => {
    res.status(500).json({ errMsg: err });
  })
});

app.post("/auth/login", auth.login);

app.post("/auth/register", auth.register);

app.post("/auth/user/:id/update", passport.authenticate("jwt", { session: false }), auth.updateAddress);

app.get("/auth/user/:id/ship", passport.authenticate("jwt", { session: false }), auth.getShip);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
DB.connect.then(() => {
  app.listen(PORT, () => {
    console.log("APIs is listening")
  });
  http.createServer(app);
  https.createServer({}, app).listen(4433,() => console.log('PORT :: 4433'));;
}).catch((err) => {
  console.log(err)
  res.status(500).json(err)
});
