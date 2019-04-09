const mongoose = require("mongoose");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error("The `id` is not valid");
    err.status = 400;
    return next(err);
  }
  return next();
};

const requiresAdmin = (req, res, next) => {
  if (!req.user || req.user.admin === false) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }
  return next();
};

module.exports = { isValidId, requiresAdmin };
