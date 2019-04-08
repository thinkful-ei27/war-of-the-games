const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/user");
const History = require("../models/history");
const Game = require("../models/game");
const recs = require("../utils/recommendations");
const { subMotivationKeywords } = require("../db/subMotivations");

// Import submotivation keywords
const { power, story, fantasy } = subMotivationKeywords;

const router = express.Router();
const jwtAuth = passport.authenticate("jwt", {
  session: false,
  failWithError: true
});

const countBy = (arr, fn) =>
  arr.map(typeof fn === "function" ? fn : val => val[fn]).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

router.get("/:id/history", (req, res, next) => {
  const { id } = req.params;

  History.find({ userId: id })
    .populate("gameOne", "name")
    .populate("gameTwo", "name")
    .populate("choice")
    .sort({ createdAt: -1 })
    .limit(6)
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.get("/history/motivations", jwtAuth, (req, res, next) => {
  const { id } = req.user;

  History.find({ userId: id })
    .populate("gameOne", ["name", "motivations"])
    .populate("gameTwo", ["name", "motivations"])
    .populate("choice", ["name", "motivations"])
    .sort({ createdAt: -1 })
    .then(results => {
      const all = [];
      const choices = [];
      const m = results.map(res => {
        const gameOneMotivations = res.gameOne.motivations;
        const gameTwoMotivations = res.gameTwo.motivations;
        const choiceMotivations = res.choice.motivations;
        gameOneMotivations.forEach(ms => all.push(ms));
        gameTwoMotivations.forEach(ms => all.push(ms));
        choiceMotivations.forEach(ms => choices.push(ms));
      });
      const allMotives = countBy(all, v => v);
      const choiceMotives = countBy(choices, v => v);
      const percentages = Object.keys(choiceMotives).reduce((a, key) => {
        const percentage = Math.floor(
          (choiceMotives[key] / allMotives[key]) * 100
        );
        const data = {
          motivation: key,
          percentage,
          fullMark: 100
        };
        a.push(data);
        return a;
      }, []);
      res.json({
        "All Motivations": allMotives,
        "All Choices": choiceMotives,
        percentages
      });
    })
    .catch(err => next(err));
});

router.get("/:id/history/submotivations", (req, res, next) => {
  const { id } = req.params;

  History.find({ userId: id })
    .populate("gameOne", ["name", "subMotivations"])
    .populate("gameTwo", ["name", "subMotivations"])
    .populate("choice", ["name", "subMotivations"])
    .sort({ createdAt: -1 })
    .then(results => {
      const all = [];
      const choices = [];
      const m = results.map(res => {
        const gameOneSubMotivations = res.gameOne.subMotivations;
        const gameTwoSubMotivations = res.gameTwo.subMotivations;
        const choiceSubMotivations = res.choice.subMotivations;
        gameOneSubMotivations.forEach(ms => all.push(ms));
        gameTwoSubMotivations.forEach(ms => all.push(ms));
        choiceSubMotivations.forEach(ms => choices.push(ms));
      });
      const allMotives = countBy(all, v => v);
      const choiceMotives = countBy(choices, v => v);
      const percentagesMotives = Object.keys(choiceMotives).reduce((a, key) => {
        const percentage = Math.floor(
          (choiceMotives[key] / allMotives[key]) * 100
        );
        a[key] = percentage;
        return a;
      }, {});
      res.json({
        "All SubMotivations": allMotives,
        "All Choices": choiceMotives,
        "Choice Percentages": percentagesMotives
      });
    })
    .catch(err => next(err));
});

/* individual game data */

router.get("/:userId/topHistory", (req, res, next) => {
  const { userId } = req.params;

  History.find({ userId })
    .sort({ createdAt: -1 })
    .populate("gameOne", "name")
    .populate("gameTwo", "name")
    .populate("choice")
    .then(userHistory => {
      const names = [];
      const winCounts = userHistory
        .reduce((arr, game) => {
          const { name, id, igdb, cloudImage } = game.choice;
          // check if inside accumulator
          if (!names.includes(name)) {
            names.push(name);
            arr.push({
              count: 1,
              name,
              id,
              igdb,
              cloudImage
            });
          } else {
            const found = arr.find(game => game.name === name);
            found.count += 1;
          }

          return arr;
        }, [])
        .sort((a, b) => {
          if (a.count < b.count) return 1;
          if (a.count > b.count) return -1;
          return 0;
        })
        .slice(0, 6);

      res.json(winCounts);
    })
    .catch(err => next(err));
});

router.post("/recs", jwtAuth, (req, res, next) => {
  const { motivations, dateNumber, timeFrame } = req.body;
  const arrayOfKeywords = motivations.reduce((a, b) => {
    const keywords = subMotivationKeywords[b];
    a.push(...keywords);
    return a;
  }, []);
  console.log(motivations);
  recs
    .getGamesBySubmotivations(
      // [...story, ...fantasy],
      arrayOfKeywords,
      [dateNumber, timeFrame]
    )
    .then(results => {
      res.json(results);
    })
    .catch(e => {
      next(e);
    });
});

router.get("/recommendations", jwtAuth, (req, res, next) => {
  let topChoices;
  let sortedSimilarGames;

  // Find top game choices for user
  return History.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(req.user.id) } },
    { $group: { _id: "$choice", count: { $sum: 1 } } }
  ])
    .sort({ count: "desc" })
    .limit(100)
    .then(his => {
      // Grab game info for top choices
      topChoices = his.map(history => history._id);
      return Game.find({ _id: { $in: topChoices } });
    })
    .then(games => {
      // Extract similar_games and count them
      const similarGamesCount = {};
      games.forEach(game =>
        game.similar_games.forEach(similarGame => {
          similarGamesCount[similarGame]
            ? (similarGamesCount[similarGame] += 1)
            : (similarGamesCount[similarGame] = 1);
        })
      );
      sortedSimilarGames = Object.keys(similarGamesCount)
        .sort((a, b) => similarGamesCount[b] - similarGamesCount[a])
        .slice(0, 5);
      return Game.find({ "igdb.id": { $in: sortedSimilarGames } });
    })
    .then(recs => {
      const sortedRecs = sortedSimilarGames
        .map(choice => recs.find(game => game.igdb.id === Number(choice)))
        .filter(e => typeof e === "object");
      res.json(sortedRecs);
    })
    .catch(err => next(err));
});

router.post("/aboutMe", jwtAuth, (req, res, next) => {
  const { content } = req.body;
  const userId = req.user.id;

  let user;
  User.findOne({ _id: userId })
    .then(_user => {
      user = _user;
      user.aboutMe = content;
      user.save();
    })
    .then(result => {
      console.log(req.originalUrl);
      res
        .location(`${req.originalUrl}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/aboutMe", jwtAuth, (req, res, next) => {
  let user;
  const userId = req.user.id;
  User.findOne({ _id: userId }).then(_user => {
    user = _user;
    res.json(user.aboutMe);
  });
});
/* ========== POST USERS ========== */

router.post("/", (req, res, next) => {
  const { firstName, lastName, username, password, profilePic } = req.body;

  const requiredFields = ["firstName", "lastName", "username", "password"];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error("Missing field in body");
    err.status = 422;
    return next(err);
  }

  const stringFields = ["username", "password", "firstName", "lastName"];
  const nonStringField = stringFields.find(field => {
    return field in req.body && typeof req.body[field] !== "string";
  });

  if (nonStringField) {
    const err = new Error("Incorrect field type: expected string");
    err.status = 422;
    return next(err);
  }

  const explicitlyTrimmedFields = [
    "username",
    "password",
    "firstName",
    "lastName"
  ];
  const nonTrimmedField = explicitlyTrimmedFields.find(field => {
    return req.body[field].trim() !== req.body[field];
  });

  if (nonTrimmedField) {
    const err = new Error("Cannot start or end with whitespace");
    err.status = 422;
    return next(err);
  }

  const sizedFields = {
    username: {
      min: 2
    },
    password: {
      min: 8,
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      "min" in sizedFields[field] &&
      req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      "max" in sizedFields[field] &&
      req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: "ValidationError",
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField].min} characters long`
        : `Wow, what a secure password! However, passwords must be at most ${
            sizedFields[tooLargeField].max
          } characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  return User.hashPassword(password)
    .then(digest => {
      const trimmedFirstName = firstName.trim();
      const trimmedLastName = lastName.trim();
      const newUser = {
        username,
        password: digest,
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        profilePic
      };
      return User.create(newUser);
    })
    .then(users => {
      res
        .location(`${req.originalUrl}/${users.id}`)
        .status(201)
        .json(users);
    })
    .catch(_err => {
      let err;
      if (err.code === 11000) {
        err = new Error("The username already exists");
        err.status = 400;
      } else {
        err = _err;
      }
      next(err);
    });
});

module.exports = router;
