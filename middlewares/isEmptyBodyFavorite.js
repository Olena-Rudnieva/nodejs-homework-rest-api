const { HttpError } = require('../helpers');

const isEmptyBodyFavorite = (req, res, next) => {
  const isEmpty = Object.keys(req.body).length === 0;
  if (isEmpty) {
    return next(HttpError(400, 'missing field favorite'));
  }
  next();
};

module.exports = isEmptyBodyFavorite;
