
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt")
const userModel = require('./models/user');
let User = userModel.User;

let jwt_obj = {
  secretOrKey: "sixber",
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  passReqToCallback: true
}

let StrategyJWT = passportJWT.Strategy;
let strategy = new StrategyJWT(jwt_obj, function (req, jwt_payload, done) {
  User.findById(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, req);
      }
      return done(null, false);
    }).catch(err => {
      console.error(err)
      return done(err, false);
    });
})
passport.use(strategy);

let expiredIn = { expiresIn: "7d" }

module.exports.login = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(400).json({ errMsg: "Incorrect Date" });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            let payload = {
              id: user.id,
              username: user.username,
              email: user.email,
              displayName: user.displayName,
              role: user.role,
            }

            let token = jwt.sign(payload, jwt_obj.secretOrKey, expiredIn);
            return res.json({ msg: "Login successful", token: token });
          } else {
            return res.status(400).json({ errMsg: "Incorrect Date" });
          }
        });
    });
};

module.exports.register = async (req, res, next) => {
  // instantiate a user object
  if (!(req.body.role == 2 || req.body.role == 3)) {
    res.status(400).json({ msg: "Wrong massage" });
    res.end();
  } else {

    let hashedPassword = await bcrypt.hash(req.body.password, 10);

    let newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      displayName: req.body.displayName,
      role: req.body.role,
    });


    return new Promise((resolve, reject) => {
      User.create(newUser, (err, user, info) => {
        if (err) {
          console.log(err);
          res.status(500)
          reject(res.json({ errMsg: err }));
        } else {
          let payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            role: user.role
          }
          let token = jwt.sign(payload, jwt_obj.secretOrKey, expiredIn);
          resolve(res.json({ msg: "Signup successful", token: token }))
        }
      });
    }).catch(err => {
      // console.log(err)
      res.status(500).json({ errMsg: err });
    })
  }
}
