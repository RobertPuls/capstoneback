const jwt = require("jsonwebtoken");
const token_secret = "french_toast";

function checkTokenSetUser(req, res, next) {
  console.log(req.params);
  const tokenHeader = req.get("Authorization");
  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1];
    jwt.verify(token, token_secret, (err, decoded) => {
      if (err) {
        next();
      } else {
        req.user = decoded;
        console.log("req.user", req.user);
        next();
      }
    });
  } else {
    next();
  }
}

function ensureLoggedIn(req, res, next) {
  console.log(req.params);
  if (req.user) {
    console.log("here");
    next();
  } else {
    res.status(401);
    next(new Error("Un-Authorized"));
  }
}

module.exports = {
  ensureLoggedIn,
  checkTokenSetUser
};
