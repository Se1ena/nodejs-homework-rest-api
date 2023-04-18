const express = require("express");

const ctrl = require("../../controllers/contactsControllers");

const { isValidId, authenticate } = require("../../middlewares");

//const {authenticate} = require("../../middlewares");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getGetContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.getAddContact
);

router.put("/:contactId", authenticate, isValidId, ctrl.updateContactById);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavoriteById
);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContactById);

module.exports = router;
