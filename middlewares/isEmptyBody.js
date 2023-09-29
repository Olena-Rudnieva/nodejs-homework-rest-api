const { HttpError } = require('../helpers');

const isEmptyBody = (req, res, next) => {
  const isEmpty = Object.keys(req.body).length === 0;
  if (isEmpty) {
    return next(HttpError(400, 'missing fields'));
  }
  next();
};

module.exports = isEmptyBody;
