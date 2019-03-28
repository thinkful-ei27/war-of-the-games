const express = require("express");
const User = require("../models/user");

/**
 * @swagger
 *
 * definitions:
 *  NewUser:
 *    type: object
 *    required:
 *      - firstName
 *      - lastName
 *      - username
 *      - password
 *    properties:
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      username:
 *        type: string
 *      password:
 *        type: string
 *  User:
 *    type: object
 *    required:
 *      - id
 *      - firstName
 *      - lastName
 *      - username
 *    properties:
 *      id:
 *        type: object
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      username:
 *        type: string
 */

const router = express.Router();

/* ========== GET USER ========== */
// router.get('/:id', (req, res, next) => {
//   const userId = req.user.id;
//   console.log('User is ', req.user, 'User ID is', userId);
//   // res.json(userId);
// });

/**
 * @swagger
 *
 * /users:
 *  post:
 *    summary: Creates a user
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: user
 *        description: User object
 *        in: body
 *        required: true
 *        type: object
 *        schema:
 *          $ref: '#/definitions/NewUser'
 *    responses:
 *      201:
 *        description: user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/User'
 */
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
