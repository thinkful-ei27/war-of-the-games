'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const {JWT_SECRET, JWT_EXPIRY} = require('../config');
const jwt = require('jsonwebtoken');

const router = express.Router();
// const User = require('../models/user');

const options = {session: false, failWithError: true};
const localAuth = passport.authenticate('local', options);

function createAuthToken (user) {
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

router.post('/login', localAuth, function(req, res) {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true});

router.post('/refresh', jwtAuth, function(req, res) {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = router;