const express = require('express');
const {
  validateBody,
  isEmptyBody,
  authenticate,
} = require('../../middlewares');
const { schemas } = require('../../models/user');
const ctrl = require('../../controllers/auth');

const router = express.Router();

router.post(
  '/register',
  isEmptyBody,
  validateBody(schemas.userSignupSchema),
  ctrl.register
);

router.post(
  '/login',
  isEmptyBody,
  validateBody(schemas.userSigninSchema),
  ctrl.login
);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;
