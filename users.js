const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const queries = require("./db/queries");
const token_secret = "french_toast";

const router = express.Router();

function validUser(user) {
  const hasEmail = typeof user.email == "string";
  const hasPass = typeof user.password == "string";
  const hasAddress = typeof user.address == "string";
  return hasEmail && hasPass && hasAddress;
}

router.post("/", function(req, res, next) {
  console.log(req.body);
  queries.createUser(req.body).then(user => res.json({
    "user": user
  }))
});

router.get("/", function(req, res, next) {
  queries.getAllUsers().then(users => res.json({
    "users": req.body
  }));
})

router.post("/signup", function(req, res, next) {
  console.log("signup route body", req.body);

  if (validUser(req.body)) {
    queries.getUserByEmail(req.body.email).then((user) => {
      console.log("here");
      if (!user) {
        bcrypt.genSalt(8, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            const user = {
              email: req.body.email,
              address: req.body.address,
              password: hash
            };
            queries.createUser(user).then((user) => {
              jwt.sign({
                id: user[0].id
              }, token_secret, {
                expiresIn: "1h"
              }, (err, token) => {
                console.log("err", err);
                console.log("token", token);
                res.json({
                  id: user[0].id,
                  token,
                  message: "ok"
                });
              });
            });
          });
        });
      } else {
        next(new Error("Email already in use"));
      }
    });
  } else {
    next(new Error("Invalid User"));
  }
});

router.post("/login", function(req, res, next) {
  if (validUser(req.body)) {
    queries.getUserByEmail(req.body.email).then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then((match) => {
          if (match) {
            jwt.sign({
              id: user.id
            }, token_secret, {
              expiresIn: "1h"
            }, (err, token) => {
              console.log("err", err);
              console.log("token", token);
              res.json({
                id: user.id,
                address: user.address,
                token,
                message: "logged in"
              });
            });
          } else {
            next(new Error("Invalid Login"));
          }
        });
      } else {
        next(new Error("Invalid Login"));
      }
    });
  } else {
    next(new Error("Invalid Login"));
  }
});

module.exports = router;
