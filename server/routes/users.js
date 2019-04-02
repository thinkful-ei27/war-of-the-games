const express = require("express");

const router = express.Router();
const User = require("../models/user");
const History = require("../models/history");
const Game = require("../models/game");

/* ========== GET USER ========== */
// router.get('/:id', (req, res, next) => {
//   const userId = req.user.id;
//   console.log('User is ', req.user, 'User ID is', userId);
//   // res.json(userId);
// });

router.get("/:id/history", (req, res, next) => {
  const { id } = req.params;

  User.findOne({ _id: id })
    .populate("history")
    .then(() => {
      History.find({ userId: id })
        .populate("gameOne", "name")
        .populate("gameTwo", "name")
        .populate("choice")
        .then(results => {
          res.json(results);
        });
    })
    .catch(err => next(err));
});

router.get("/:id/recommendations", (req, res, next) => {
  let topChoices;

  return History.aggregate([{ $group: { _id: "$choice", count: { $sum: 1 } } }])
    .sort({ count: "desc" })
    .limit(5)
    .then(his => {
      topChoices = his.map(history => history._id);
      return Game.find({ _id: { $in: topChoices } });
    })
    .then(results => {
      const sortedRecs = topChoices.map(choice =>
        results.find(game => game._id.toString() === choice.toString())
      );
      res.json(sortedRecs);
    })
    .catch(err => next(err));
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

  return User.hashPassword(password)
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
