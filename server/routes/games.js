/* eslint-disable camelcase */
const express = require("express");
const passport = require("passport");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const Game = require("../models/game");
const User = require("../models/user");
const igdbApi = require("../utils/gameApi");
const imagesApi = require("../utils/imagesApi");
const { isValidId, requiresAdmin } = require("./validators");
const { JWT_SECRET } = require("../config");

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    Game:
 *      type: object
 *      required:
 *        - name
 *        - igdb
 *        - coverUrl
 *      properties:
 *        id:
 *          type: string
 *          example: 5c9a959ba5d0dd09e07f45a7
 *        name:
 *          type: string
 *          example: Super Mario 64
 *        igdb:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *              format: int32
 *              example: 1074
 *            slug:
 *              type: string
 *              example: super-mario-64
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        coverUrl:
 *          type: string
 *          example: https://images.igdb.com/igdb/image/upload/t_720p/scutr4p9gytl4txb2soy.jpg
 *        cloudImage:
 *          type: string
 *          example: https://res.cloudinary.com/hjihgo1pd/image/upload/v1554169097/5c9a959ba5d0dd09e07f45a7.jpg
 *        core:
 *          type: boolean
 *          default: false
 *          example: true
 *        firstReleaseDate:
 *          type: integer
 *          format: int32
 *          example: 835488000
 *        summary:
 *          type: string
 *          example: Mario is invited by Princess Peach to her castle, but once he arrives he finds out that Bowser has kidnapped her. Mario has to overcome many challenges and collect Power Stars hidden in the castle's paintings and walls to defeat Bowser and rescue Peach in this seminal 3D platformer.
 *        similar_games:
 *          type: array
 *          items:
 *            type: integer
 *            format: int32
 *            example: 1068
 *        motivations:
 *          type: array
 *          items:
 *            type: string
 *            example: action
 *        subMotivations:
 *          type: array
 *          items:
 *            type: string
 *            example: destruction
 *        genres:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *                example: 5ca6594c66e3f116a70c7aa8
 *              id:
 *                type: integer
 *                format: int32
 *                example: 8
 *              name:
 *                type: string
 *                example: Platform
 *        platforms:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *                example: 5ca6594c66e3f116a70c7aac
 *              id:
 *                type: integer
 *                format: int32
 *                example: 4
 *              name:
 *                type: string
 *                example: Nintendo 64
 */

const router = express.Router();
const jwtAuth = passport.authenticate("jwt", {
  session: false,
  failWithError: true
});
const sixMonthsAgo = moment()
  .subtract(6, "months")
  .unix();

const findRandGame = (count, filters) => {
  const rand = Math.floor(Math.random() * count);
  return Game.findOne(filters).skip(rand);
};

const findTwoRandGames = (count, filters) =>
  Promise.all([
    findRandGame(count, filters),
    findRandGame(count, filters)
  ]).then(results =>
    results[0].id === results[1].id ? findTwoRandGames(count) : results
  );

const igdbIdRequired = (req, res, next) => {
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
  return next();
};

/**
 * @swagger
 *
 * /games:
 *  get:
 *    tags:
 *      - Games
 *    summary: Returns games
 *    parameters:
 *      - name: slug
 *        in: query
 *        description: IGDB slug
 *        schema:
 *          type: string
 *        example: super-mario-64
 *    responses:
 *      200:
 *        description: A JSON array of games
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Game'
 */
router.get("/", (req, res, next) => {
  const { slug } = req.query;
  const filter = {};

  if (slug) {
    filter["igdb.slug"] = slug;
  }

  Game.find(filter)
    .sort({ name: "asc" })
    .then(results => res.json(results))
    .catch(err => next(err));
});

router.get("/igdb/:slug", (req, res, next) => {
  const { slug } = req.params;

  return igdbApi
    .getIdFromSlug(slug)
    .then(result => {
      res.json(result);
    })
    .catch(e => {
      next(e);
    });
});

// GET /api/games/battle must go before GET /api/games/:id or else it will never get called.
/**
 * @swagger
 *
 * /games/battle:
 *  get:
 *    tags:
 *      - Games
 *    summary: Returns two games
 *    responses:
 *      200:
 *        description: A JSON array of two games
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Game'
 */
router.get("/battle", (req, res, next) => {
  const filters = { firstReleaseDate: { $lt: sixMonthsAgo }, core: true };
  // Get user if authToken is included in request
  let user;
  if (req.headers.authorization) {
    const authToken = req.headers.authorization.split(" ")[1];
    jwt.verify(authToken, JWT_SECRET, (err, authData) => {
      if (err) {
        user = false;
      } else {
        ({ user } = authData);
      }
    });
  } else {
    user = false;
  }
  let userPromise;
  user
    ? (userPromise = User.findById(user.id, "games.neverPlayed"))
    : (userPromise = Promise.resolve(null));
  return userPromise
    .then(dbUser => {
      // If user exists, filter their neverPlayed games out of the query
      if (dbUser) {
        const { neverPlayed } = dbUser.games;
        // Must be `_id`, not `id`
        filters._id = { $nin: neverPlayed };
      }
      return Game.countDocuments(filters);
    })
    .then(count => {
      return findTwoRandGames(count, filters);
    })
    .then(results => res.json(results))
    .catch(err => next(err));
});

/**
 * @swagger
 *
 * /games/{gameId}:
 *  get:
 *    tags:
 *      - Games
 *    summary: Returns a game by ID.
 *    parameters:
 *      - name: gameId
 *        in: path
 *        required: true
 *        description: Game ID
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: game
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Game'
 */
router.get("/:id", isValidId, (req, res, next) => {
  const { id } = req.params;
  let game;
  let gameInfo;
  Game.findOne({ _id: id })
    .then(_game => {
      _game ? (game = _game) : next();
      return Game.find({ "igdb.id": { $in: game.similar_games } }).then(
        similar_games => {
          const {
            name,
            igdb,
            coverUrl,
            platforms,
            genres,
            summary,
            createdAt,
            updatedAt,
            cloudImage
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
              cloudImage
            },
            { similar_games }
          );
          res.json(gameInfo);
        }
      );
    })
    .catch(err => next(err));
});

/**
 * @swagger
 *
 * /games:
 *  post:
 *    tags:
 *      - Games
 *    summary: Creates a game
 *    requestBody:
 *      description: IGDB ID
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: number
 *    responses:
 *      201:
 *        description: game
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Game'
 */
router.post("/", jwtAuth, igdbIdRequired, (req, res, next) => {
  const { igdbId } = req.body;

  return igdbApi
    .getGame(igdbId)
    .then(result => {
      const {
        name,
        cover = { image_id: false },
        slug,
        summary,
        genres,
        platforms,
        similar_games: similarGames,
        first_release_date: firstReleaseDate
      } = result;
      const { image_id: imageId } = cover;
      const coverUrl = imageId
        ? `https://images.igdb.com/igdb/image/upload/t_720p/${imageId}.jpg`
        : null;
      const newGame = {
        igdb: {
          id: igdbId,
          slug
        },
        name,
        coverUrl,
        summary,
        genres,
        platforms,
        similar_games: similarGames,
        firstReleaseDate
      };
      return Game.create(newGame);
    })
    .then(async game => {
      const { id, coverUrl } = game;
      let secureUrl;
      if (coverUrl) {
        const imgResults = await imagesApi.saveImgById(id, coverUrl);
        secureUrl = imgResults.secure_url;
      } else {
        secureUrl = null;
      }
      const toUpdate = { cloudImage: secureUrl };

      return Game.findOneAndUpdate({ _id: id }, toUpdate, { new: true });
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

/**
 * @swagger
 *
 * /games/{gameId}:
 *  put:
 *    tags:
 *      - Games
 *    summary: Updates a game
 *    parameters:
 *      - name: gameId
 *        in: path
 *        required: true
 *        description: Game ID
 *        schema:
 *          type: string
 *    requestBody:
 *      description: IGDB ID
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: number
 *    responses:
 *      200:
 *        description: updated game
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Game'
 */
router.put(
  "/:id",
  jwtAuth,
  requiresAdmin,
  isValidId,
  igdbIdRequired,
  (req, res, next) => {
    const { id } = req.params;
    const { igdbId } = req.body;
    let game;

    return igdbApi
      .getGame(igdbId)
      .then(async result => {
        const {
          name,
          cover = { image_id: false },
          slug,
          summary,
          genres,
          platforms,
          similar_games: similarGames,
          first_release_date: firstReleaseDate
        } = result;

        const { image_id: imageId } = cover;
        const coverUrl = imageId
          ? `https://images.igdb.com/igdb/image/upload/t_720p/${imageId}.jpg`
          : null;
        let secureUrl;
        if (coverUrl) {
          const imgResults = await imagesApi.saveImgById(id, coverUrl);
          secureUrl = imgResults.secure_url;
        } else {
          secureUrl = null;
        }
        const toUpdate = {
          igdb: {
            id: igdbId,
            slug
          },
          name,
          coverUrl,
          summary,
          genres,
          platforms,
          similar_games: similarGames,
          cloudImage: secureUrl,
          firstReleaseDate
        };
        return Game.findOneAndUpdate({ _id: id }, toUpdate, { new: true });
      })
      .then(_game => {
        // Returned game with updated items
        game = _game;
        if (game) {
          return Game.find({ "igdb.id": { $in: game.similar_games } });
        }
        return next();
      })
      .then(similarGames => {
        const {
          name,
          igdb,
          coverUrl,
          platforms,
          genres,
          summary,
          createdAt,
          updatedAt,
          cloudImage,
          firstReleaseDate
        } = game;
        const gameInfo = Object.assign(
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
            cloudImage,
            firstReleaseDate
          },
          { similar_games: similarGames }
        );
        res.json(gameInfo);
      })
      .catch(err => next(err));
  }
);

router.put("/:id/images", jwtAuth, isValidId, async (req, res, next) => {
  const { id } = req.params;

  Game.find({ _id: id })
    .then(result => {
      const { coverUrl } = result[0];
      return coverUrl;
    })
    .then(coverUrl => {
      return imagesApi.saveImgById(id, coverUrl);
    })
    .then(imgResults => {
      const { secure_url } = imgResults;
      const updateImage = { cloudImage: secure_url };
      return Game.findOneAndUpdate({ _id: id }, updateImage, {
        new: true
      });
    })
    .then(finalResult => {
      res.json(finalResult);
    })
    .catch(e => {
      next(e);
    });
});

module.exports = router;
