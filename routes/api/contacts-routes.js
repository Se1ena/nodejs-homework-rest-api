const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");

const {validateBody} = require("../../utils");

const {schemas} = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getGetContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.getAddContact);

router.put("/:contactId", ctrl.updateContactById);

router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), ctrl.updateFavoriteById);

router.delete("/:contactId", ctrl.deleteContactById);

module.exports = router;
