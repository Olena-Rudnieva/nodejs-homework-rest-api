const express = require('express');
const ctrl = require('../../controllers/contacts');

const { validateBody, isEmptyBody, isValidId } = require('../../middlewares/');
const schemas = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', isEmptyBody, validateBody(schemas.addSchema), ctrl.addContact);

// router.delete('/:id', isValidId, ctrl.removeContact);

// router.put(
//   '/:id',
//   isEmptyBody,
//   isValidId,
//   validateBody(schemas.addSchema),
//   ctrl.updateContact
// );

module.exports = router;
