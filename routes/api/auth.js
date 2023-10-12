const express = require('express');
const { validateBody, isEmptyBody } = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post(
  '/signup',
  isEmptyBody,
  validateBody(schemas.userSignupSchema),
  ctrl.signup
);

router.post(
  '/signin',
  isEmptyBody,
  validateBody(schemas.userSigninSchema),
  ctrl.signin
);

module.exports = router;
