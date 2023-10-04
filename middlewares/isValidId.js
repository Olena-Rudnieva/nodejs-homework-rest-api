const { isValidObjectId } = require('mongoose');
const { HttpEror } = require('../helpers');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(req)) {
    next(HttpEror(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidId;
