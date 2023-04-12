const express = require("express");

const ctrl = require("../../controllers/contactsControllers");

const {isValidId} = require("../../middlewares/isValidId");

const {validateBody} = require("../../utils");

const {schemas} = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getGetContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.getAddContact);

router.put("/:contactId", isValidId, ctrl.updateContactById);

router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavoriteById);

router.delete("/:contactId", isValidId, ctrl.deleteContactById);

module.exports = router;
