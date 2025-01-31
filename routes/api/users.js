const express = require('express');
const {
  validateBody,
  isEmptyBody,
  authenticate,
  upload,
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

router.get('/verify/:verificationToken', ctrl.verify);

router.post(
  '/verify',
  isEmptyBody,
  validateBody(schemas.userEmailSchema),
  ctrl.resendVerifyEmail
);

router.post(
  '/login',
  isEmptyBody,
  validateBody(schemas.userSigninSchema),
  ctrl.login
);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch(
  '/',
  authenticate,
  validateBody(schemas.userSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

module.exports = router;
