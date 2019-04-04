const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { totalGamesPlayed, gamesWon } = require("../utils/queries");

const History = require("../models/history");
const User = require("../models/user");

const Game = require("../models/game");

const { isValidId } = require("./validators");

const router = express.Router();
const jwtAuth = passport.authenticate("jwt", {
  session: false,
  failWithError: true
});

const missingChoice = (req, res, next) => {
  const { choice } = req.body;

  if (!choice) {
    const err = new Error("Missing `choice` in request body");
    err.status = 400;
    return next(err);
  }
  return next();
};

/* ========== GET/READ ALL ITEMS ========== */

router.get("/", (req, res, next) => {
  History.find()
    // .populate('gameOne', 'name')
    // .populate('gameTwo', 'name')
    // .populate('choice', 'name')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/all", (req, res, next) => {
  let history;
  History.find()
    .then(results => {
      history = results;
      return Game.find();
    })
    .then(results => {
      const all = [];
      results.forEach(game => {
        const totalGames = history.filter(battle => {
          return (
            battle.gameOne.toString() === game.id ||
            battle.gameTwo.toString() === game.id
          );
        });
        const totalGamesWon = history.filter(battle => {
          return battle.choice.toString() === game.id;
        });

        all.push({
          id: game.id,
          totalGamesPlayed: totalGames.length,
          totalGamesWon: totalGamesWon.length,
          percentage: (totalGamesWon.length / totalGamesPlayed.length).toFixed(
            2
          )
        });
      });
      return res.json(all);
    })
    .catch(err => next(err));
});

/* ========== GET/READ ONE ITEM ========== */
router.get("/:id", isValidId, (req, res, next) => {
  const { id } = req.params;

  History.findOne({ _id: id })
    .populate("gameOne", "name")
    .populate("gameTwo", "name")
    .populate("choice", "name")
    .then(result => (result ? res.json(result) : next()))
    .catch(err => next(err));
});

router.get("/:id/results", async (req, res, next) => {
  const { id } = req.params;
  try {
    const { name, cloudImage, coverUrl } = await Game.findOne({ _id: id });
    const wonGames = await gamesWon(id);
    const totalGames = await totalGamesPlayed(id);
    const percentage = wonGames / totalGames;

    res.json({
      percentage: Number(percentage.toFixed(2)),
      wonGames,
      totalGames,
      name,
      cloudImage: cloudImage || coverUrl
    });
  } catch (e) {
    const err = new Error("No history available yet for that game");
    err.status = 404;
    return next(err);
  }
});

/* ========== POST/CREATE AN ITEM ========== */
router.post("/", jwtAuth, (req, res, next) => {
  const { gameOne, gameTwo, choice } = req.body;
  const userId = req.user.id;

  const newHist = { gameOne, gameTwo, choice, userId };

  /** *** Never trust users - validate input **** */
  if (!gameOne || !gameTwo || !choice) {
    const err = new Error("Missing field in request body");
    err.status = 400;
    return next(err);
  }

  // Validate that gameOne, gameTwo, and choice are valid MongoIDs
  const validate =
    mongoose.Types.ObjectId.isValid(gameOne) &&
    mongoose.Types.ObjectId.isValid(gameTwo) &&
    mongoose.Types.ObjectId.isValid(choice) &&
    mongoose.Types.ObjectId.isValid(userId);
  if (!validate) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }

  let user;
  let responseHistory;
  return User.findOne({ _id: userId })
    .then(result => {
      user = result;
    })
    .then(() => {
      History.create(newHist)
        .then(User.findOne({ _id: userId }))
        .then(history => {
          responseHistory = history;
          user.history.push(history._id);
          return user.save();
        })
        .then(result => {
          res
            .location(`${req.originalUrl}/${result.id}`)
            .status(201)
            .json(responseHistory);
        })
        .catch(err => {
          next(err);
        });
    });
});

/* ========== PUT/UPDATE AN ITEM ========== */
router.put("/:id", isValidId, missingChoice, (req, res, next) => {
  const { id } = req.params;
  const { choice } = req.body;

  const updateChoice = { choice };

  History.findOne({ _id: id })
    .then(games => {
      if (!games) next();
      const { gameOne, gameTwo } = games;

      if (choice !== gameOne.toString() && choice !== gameTwo.toString()) {
        const err = new Error("Choice does not equal game one or game two");
        err.status = 400;
        return next(err);
      }
    })
    .then(() => {
      return History.findOneAndUpdate({ _id: id }, updateChoice, { new: true });
    })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

/* ========== DELETE AN ITEM ========== */
router.delete("/:id", isValidId, (req, res, next) => {
  const { id } = req.params;

  History.findOneAndDelete({ _id: id })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = router;
