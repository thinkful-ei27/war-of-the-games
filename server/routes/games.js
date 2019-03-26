const express = require("express");
const Game = require("../models/game");

const router = express.Router();

router.get("/", (req, res, next) => {
  Game.find()
    .sort({ name: "asc" })
    .then(results => res.json(results))
    .catch(err => next(err));
});

module.exports = router;
