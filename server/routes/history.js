const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { totalGamesPlayed, gamesWon } = require("../utils/queries");
const History = require("../models/history");
const User = require("../models/user");
const Game = require("../models/game");
const { isValidId } = require("./validators");

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    History:
 *      type: object
 *      required:
 *        - gameOne
 *        - gameTwo
 *        - choice
 *      properties:
 *        gameOne:
 *          type: string
 *          example: 5c9a959ba5d0dd09e07f45a7
 *        gameTwo:
 *          type: string
 *          example: 5c9a959ba5d0dd09e07f45a8
 *        choice:
 *          type: string
 *          example: 5c9a959ba5d0dd09e07f45a7
 *        userId:
 *          type: string
 *          example: 5c9bcf48b11f8f14c6e17730
 */

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

/**
 * @swagger
 *
 * /history:
 *  get:
 *    tags:
 *      - History
 *    summary: Returns all histories
 *    responses:
 *      200:
 *        description: A JSON array of histories
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/History'
 */
router.get("/", (req, res, next) => {
  History.find()
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

/**
 * @swagger
 *
 * /history/{historyId}:
 *  get:
 *    tags:
 *      - History
 *    summary: Returns a history by ID
 *    parameters:
 *      - name: historyId
 *        in: path
 *        required: true
 *        description: History ID
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: History
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/History'
 *      404:
 *        description: Not Found error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  format: int32
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Not Found
 */
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

/**
 * @swagger
 *
 * /history:
 *  post:
 *    tags:
 *      - History
 *    summary: Creates a history
 *    security:
 *      - BearerAuth
 *    requestBody:
 *      description: History object
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              gameOne:
 *                type: string
 *                example: 5c9a959ba5d0dd09e07f45a7
 *              gameTwo:
 *                type: string
 *                example: 5c9a959ba5d0dd09e07f45a8
 *              choice:
 *                type: string
 *                example: 5c9a959ba5d0dd09e07f45a7
 *    responses:
 *      201:
 *        description: New history
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/History'
 *      400:
 *        description: Validation error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  format: int32
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Missing field in request body
 *      401:
 *        description: Unauthorized error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: int
 *                  format: int32
 *                  example: 401
 *                message:
 *                  type: string
 *                  example: Unauthorized
 */
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
          user.battles ? (user.battles += 1) : (user.battles = 1);
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

/**
 * @swagger
 *
 * /history/{historyId}:
 *  put:
 *    tags:
 *      - History
 *    summary: Updates a history
 *    parameters:
 *      - name: historyId
 *        in: path
 *        required: true
 *        description: History ID
 *        schema:
 *          type: string
 *    requestBody:
 *      description: New choice
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              choice:
 *                type: string
 *                example: 5c9a959ba5d0dd09e07f45a7
 *    responses:
 *      200:
 *        description: Updated history
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/History'
 *      400:
 *        description: Validation error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  format: int32
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Choice does not equal game one or game two
 *      404:
 *        description: Not Found error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  format: int32
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Not Found
 */
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

/**
 * @swagger
 *
 * /history/{historyId}:
 *  delete:
 *    tags:
 *      - History
 *    summary: Removes a history
 *    parameters:
 *      - name: historyId
 *        in: path
 *        required: true
 *        description: History ID
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: No content
 */
router.delete("/:id", isValidId, (req, res, next) => {
  const { id } = req.params;

  History.findOneAndDelete({ _id: id })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = router;
