const express = require("express");
const Game = require("../models/game");
const igdbApi = require("../utils/gameApi");

/**
 * @swagger
 *
 * definitions:
 *  NewGame:
 *    type: object
 *    required:
 *      - name
 *      - igdb
 *      - coverUrl
 *    properties:
 *      name:
 *        type: string
 *      igdb:
 *        type: object
 *      coverUrl:
 *        type: string
 *  Game:
 *    allOf:
 *      - $ref: '#/definitions/NewGame'
 *      - required:
 *        - id
 *      - properties:
 *        id:
 *          type: object
 */

const router = express.Router();

const findRandGame = count => {
  const rand = Math.floor(Math.random() * count);
  return Game.findOne().skip(rand);
};

const findTwoRandGames = count => {
  return Promise.all([findRandGame(count), findRandGame(count)]).then(results =>
    results[0].id === results[1].id ? findTwoRandGames(count) : results
  );
};

/**
 * @swagger
 *
 * /games:
 *  get:
 *    summary: Returns games
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A JSON array of games
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/definitions/Game'
 */
router.get("/", (req, res, next) => {
  Game.find()
    .sort({ name: "asc" })
    .then(results => res.json(results))
    .catch(err => next(err));
});

/**
 * @swagger
 *
 * /games/battle:
 *  get:
 *    summary: Returns two games
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: A JSON array of two games
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/definitions/Game'
 */
router.get("/battle", (req, res, next) => {
  return Game.countDocuments()
    .then(count => findTwoRandGames(count))
    .then(results => res.json(results))
    .catch(err => next(err));
});

/**
 * @swagger
 *
 * /games:
 *  post:
 *    summary: Creates a game
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: igdbId
 *        description: IGDB ID
 *        in: body
 *        required: true
 *        type: number
 *        schema:
 *          $ref: '#/definitions/NewGame'
 *    responses:
 *      201:
 *        description: game
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Game'
 */
router.post("/", (req, res, next) => {
  const newGame = { igdb: {} };
  const { igdbId } = req.body;

  if (!igdbId) {
    const err = new Error("Missing `igdbId` in request body");
    err.status = 400;
    return next(err);
  }

  if (!Number(igdbId)) {
    const err = new Error("`igdbId` should be a number");
    err.status = 400;
    return next(err);
  }

  newGame.igdb.id = igdbId;
  return igdbApi
    .getGame(igdbId)
    .then(res => {
      const { name, cover, slug } = res;
      newGame.name = name;
      newGame.igdb.slug = slug;
      return igdbApi.getCover(cover);
    })
    .then(cover => {
      const { image_id } = cover;
      newGame.coverUrl = `https://images.igdb.com/igdb/image/upload/t_720p/${image_id}.jpg`;
      return Game.create(newGame);
    })
    .then(game =>
      res
        .location(`${req.originalUrl}/${game.id}`)
        .status(201)
        .json(game)
    )
    .catch(err => {
      if (err.code === 11000) {
        err = new Error("Game already exists");
        err.status = 422;
        err.reason = "ValidationError";
        err.location = "igdbId";
      }
      next(err);
    });
});

module.exports = router;
