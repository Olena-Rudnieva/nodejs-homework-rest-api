const express = require('express');
const ctrl = require('../../controllers/contacts');

const {
  validateBody,
  isEmptyBody,
  isValidId,
  authenticate,
} = require('../../middlewares/');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrl.listContacts);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

router.post(
  '/',
  authenticate,
  isEmptyBody,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

router.put(
  '/:id',
  authenticate,
  isEmptyBody,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  '/:id/favorite',
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
