const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config");

const router = express.Router();

const options = { session: false, failWithError: true };
const localAuth = passport.authenticate("local", options);

function createAuthToken(user) {
  const { id, username, admin } = user;
  const userInfo = { id, username, admin };
  return jwt.sign({ user: userInfo }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

router.post("/login", localAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

const jwtAuth = passport.authenticate("jwt", {
  session: false,
  failWithError: true
});

router.post("/refresh", jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = router;
