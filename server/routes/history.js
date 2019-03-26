'use strict';

const express = require('express');

const History = require('../models/history');

const {isValidId} = require('./validators');

const missingChoice = (req, res, next) => {
  const { choice } = req.body;

  if (!choice) {
    const err = new Error('Missing `choice` in request body');
    err.status = 400;
    return next(err);
  } else {
    next();
  }
};

const router = express.Router();

const passport = require('passport');
router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {

  History.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


/* ========== GET/READ ONE ITEM ========== */
router.get('/:id', isValidId, (req, res, next) => {
  const { id } = req.params;

  History.findOne({ _id: id })
    .then(result => result ? res.json(result) : next())
    .catch(err => next(err));
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { gameOne, gameTwo, choice } = req.body;
  const userId = req.user.id;

  const newHist = { gameOne, gameTwo, choice, userId };

  /***** Never trust users - validate input *****/
  if (!gameOne || !gameTwo || !choice) {
    const err = new Error('Missing field in request body');
    err.status = 400;
    return next(err);
  }

  History.create(newHist)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      // if (err.code === 11000) {
      //   err = new Error('Choice already exists');
      //   err.status = 400;
      // }
      next(err);
    });
});

/* ========== PUT/UPDATE AN ITEM ========== */
router.put('/:id', isValidId, missingChoice, (req, res, next) => {
  const { id } = req.params;
  const { choice } = req.body;

  const updateChoice = { choice };

  History
    .findOne({ _id: id })
    .then((games) => {
      if (!games) next();
      const {gameOne, gameTwo} = games;

      if (choice !== gameOne && choice !== gameTwo) {
        const err = new Error('Choice does not equal game one or game two');
        err.status = 400;
        return next(err);
      }

      return;
    })
    .then (() => {
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
router.delete('/:id', isValidId, (req, res, next) => {
  const { id } = req.params;

  History.findOneAndDelete({ _id: id })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = router;