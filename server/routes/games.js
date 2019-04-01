const express = require('express');
const passport = require("passport");
const Game = require('../models/game');
const igdbApi = require('../utils/gameApi');
const { isValidId } = require('./validators');

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
const jwtAuth = passport.authenticate("jwt", {
  session: false,
  failWithError: true
});

const findRandGame = (count) => {
  const rand = Math.floor(Math.random() * count);
  return Game.findOne().skip(rand);
};

const findTwoRandGames = count => Promise.all([findRandGame(count), findRandGame(count)]).then(results =>
  (results[0].id === results[1].id ? findTwoRandGames(count) : results),
);

const igdbIdRequired = (req, res, next) => {
  const { igdbId } = req.body;

  if (!igdbId) {
    const err = new Error("Missing `igdbId` in request body");
    err.status = 400;
    return next(err);
  } else if (!Number(igdbId)) {
    const err = new Error("`igdbId` should be a number");
    err.status = 400;
    return next(err);
  } else {
    return next();
  }
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
router.get('/', (req, res, next) => {
  const { slug } = req.query;
  const filter = {};

  if (slug) {
    filter['igdb.slug'] = slug;
  }

  Game.find(filter)
    .sort({ name: 'asc' })
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
router.get('/battle', (req, res, next) => Game.countDocuments()
  .then(count => findTwoRandGames(count))
  .then(results => res.json(results))
  .catch(err => next(err)));

router.get('/:id', isValidId, (req, res, next) => {
  const { id } = req.params;
  let game; let
    gameInfo;
  Game.findOne({ _id: id })
    .then((_game) => {
      _game ? (game = _game) : next();
      return Game.find({ 'igdb.id': { $in: game.similar_games } }).then(
        (similar_games) => {
          const {
            name,
            igdb,
            coverUrl,
            platforms,
            genres,
            summary,
            createdAt,
            updatedAt,
          } = game;
          gameInfo = Object.assign(
            {},
            {
              id,
              name,
              igdb,
              platforms,
              coverUrl,
              genres,
              summary,
              createdAt,
              updatedAt,
            },
            { similar_games },
          );
          res.json(gameInfo);
        },
      );
    })
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
router.post('/', jwtAuth, igdbIdRequired, (req, res, next) => {
  const { igdbId } = req.body;

  return igdbApi
    .getGame(igdbId)
    .then((res) => {
      const {
        name,
        cover,
        slug,
        summary,
        genres,
        platforms,
        similar_games,
      } = res;
      const { image_id } = cover;
      const newGame = {
        igdb: {
          id: igdbId,
          slug,
        },
        name,
        coverUrl: `https://images.igdb.com/igdb/image/upload/t_720p/${image_id}.jpg`,
        summary,
        genres,
        platforms,
        similar_games,
      };
      return Game.create(newGame);
    })
    .then(game =>
      res
        .location(`${req.originalUrl}/${game.id}`)
        .status(201)
        .json(game),
    )
    .catch((err) => {
      if (err.code === 11000) {
        err = new Error('Game already exists');
        err.status = 422;
        err.reason = 'ValidationError';
        err.location = 'igdbId';
      }
      next(err);
    });
});

router.put("/:id", jwtAuth, isValidId, igdbIdRequired, (req, res, next) => {
  const { id } = req.params;
  const { igdbId } = req.body;
  let game;

  return igdbApi
    .getGame(igdbId)
    .then(res => {
      const {
        name,
        cover,
        slug,
        summary,
        genres,
        platforms,
        similar_games
      } = res;
      const { image_id } = cover;
      const toUpdate = {
        igdb: {
          id: igdbId,
          slug
        },
        name,
        coverUrl: `https://images.igdb.com/igdb/image/upload/t_720p/${image_id}.jpg`,
        summary,
        genres,
        platforms,
        similar_games
      };
      return Game.findOneAndUpdate({ _id: id }, toUpdate, { new: true });
    })
    .then(_game => {
      game = _game;
      if (game) {
        return Game.find({'igdb.id': {$in: game.similar_games}})
      } else {
        return next();
      }
    })
    .then(similar_games => {
      const {
        name,
        igdb,
        coverUrl,
        platforms,
        genres,
        summary,
        createdAt,
        updatedAt,
      } = game;
      gameInfo = Object.assign(
        {},
        {
          id,
          name,
          igdb,
          platforms,
          coverUrl,
          genres,
          summary,
          createdAt,
          updatedAt,
        },
        { similar_games },
      );
      res.json(gameInfo);
    })
    .catch(err => next(err));
});

module.exports = router;
