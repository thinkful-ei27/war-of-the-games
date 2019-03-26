const express = require("express");
const Game = require("../models/game");

const router = express.Router();

const findRandGame = count => {
  const rand = Math.floor(Math.random() * count);
  return Game.findOne().skip(rand);
};

router.get("/", (req, res, next) => {
  Game.find()
    .sort({ name: "asc" })
    .then(results => res.json(results))
    .catch(err => next(err));
});

router.get("/battle", (req, res, next) => {
  return Game.countDocuments()
    .then(count => {
      return Promise.all([findRandGame(count), findRandGame(count)]);
    })
    .then(results => res.json(results))
    .catch(err => next(err));
});

module.exports = router;
