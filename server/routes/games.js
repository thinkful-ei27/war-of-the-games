const express = require("express");
const Game = require("../models/game");

const router = express.Router();

router.get("/", (req, res, next) => {
  Game.find().then(results => res.json(results));
});

module.exports = router;
