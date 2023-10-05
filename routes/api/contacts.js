const express = require('express');
const ctrl = require('../../controllers/contacts');

const {
  validateBody,
  isEmptyBody,
  isValidId,
  isEmptyBodyFavorite,
} = require('../../middlewares/');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', isEmptyBody, validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:id', isValidId, ctrl.removeContact);

router.put(
  '/:id',
  isEmptyBody,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  '/:id/favorite',
  isEmptyBodyFavorite,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
