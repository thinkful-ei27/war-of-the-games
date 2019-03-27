'use strict';

const express = require('express');
const mongoose = require('mongoose');

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

// const passport = require('passport');
// router.use('/', passport.authenticate('jwt', {session: false, failWithError: true}));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {

  History.find()
    .populate('gameOne', 'name')
    .populate('gameTwo', 'name')
    .populate('choice', 'name')
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
    .populate('gameOne', 'name')
    .populate('gameTwo', 'name')
    .populate('choice', 'name')
    .then(result => result ? res.json(result) : next())
    .catch(err => next(err));
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { gameOne, gameTwo, choice } = req.body;
  // const userId = req.user.id;

  const newHist = { gameOne, gameTwo, choice };

  /***** Never trust users - validate input *****/
  if (!gameOne || !gameTwo || !choice) {
    const err = new Error('Missing field in request body');
    err.status = 400;
    return next(err);
  }

  // Validate that gameOne, gameTwo, and choice are valid MongoIDs
  const validate = mongoose.Types.ObjectId.isValid(gameOne) && mongoose.Types.ObjectId.isValid(gameTwo) && mongoose.Types.ObjectId.isValid(choice);
  if (!validate) {
    const err = new Error('The `id` is not valid');
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
      let {gameOne, gameTwo} = games;

      
      if (choice !== gameOne.toString() && choice !== gameTwo.toString()) {
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