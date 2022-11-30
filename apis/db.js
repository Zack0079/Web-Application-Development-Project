
const mongoose = require("mongoose");
const URI = "mongodb+srv://ctse48:X1C1JQbUzuEJbKxg@cluster0.7hrx1o4.mongodb.net/comp229project?retryWrites=true&w=majority"

//MongoDB connection
module.exports.connect = new Promise((resolve, reject) => {
    mongoose.connect(URI);
    let mongoDB = mongoose.connection;
    mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
    mongoDB.once('open', () => {
      console.log("Connected to MongoDB");
    });
    resolve(mongoDB)

  }).catch(err => {
    console.log(err);
    return err
  })



// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("foo");
//   }, 300);
// });

// myPromise
//   .then(handleFulfilledA, handleRejectedA)
//   .then(handleFulfilledB, handleRejectedB)
//   .then(handleFulfilledC, handleRejectedC);