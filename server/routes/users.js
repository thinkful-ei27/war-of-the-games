const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const User = require("../models/user");
const History = require("../models/history");

/* ========== GET USER ========== */
// router.get('/:id', (req, res, next) => {
//   const userId = req.user.id;
//   console.log('User is ', req.user, 'User ID is', userId);
//   // res.json(userId);
// });

/* GET full single user history sorted by the newest vote */
router.get("/:id/history", (req, res, next) => {
  const { id } = req.params;

  User.findOne({ _id: id })
    .populate("history")
    .then(() => {
      History.find({ userId: id })
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
            });

          res.json({ winCounts });
        });
    });
});

/* individual game data */
router.get("/:userId/history/:gameId", (req, res, next) => {
  const { userId, gameId } = req.params;
  let totalHistoryCount;
  let totalWins;
  History.find({ userId })
    .then(history => {
      console.log(history);
      totalHistoryCount = history.length;
    })
    .then(() => History.find({ userId, choice: gameId }))
    .then(choice => {
      totalWins = choice.length;
    })
    .then(() =>
      res.json({
        totalHistoryCount,
        totalWins,
        percentageWon: Number(totalWins / totalHistoryCount).toFixed(2) * 100
      })
    );
});

/* ========== POST USERS ========== */

router.post("/", (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

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

  User.hashPassword(password)
    .then(digest => {
      const trimmedFirstName = firstName.trim();
      const trimmedLastName = lastName.trim();
      const newUser = {
        username,
        password: digest,
        firstName: trimmedFirstName,
        lastName: trimmedLastName
      };
      return User.create(newUser);
    })
    .then(users => {
      res
        .location(`${req.originalUrl}/${users.id}`)
        .status(201)
        .json(users);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error("The username already exists");
        err.status = 400;
      }
      next(err);
    });
});

module.exports = router;
