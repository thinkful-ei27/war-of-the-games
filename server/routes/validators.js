'use strict';

const mongoose = require('mongoose');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  } else {
    next();
  }
};

module.exports = { isValidId };