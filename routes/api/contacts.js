const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`
  }),
  email: Joi.string().email().required().messages({
    "any.required": `"email" is required`
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is required`
  })
})

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    console.log(error);
    if(error){
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    res.status(200).json({
      message: "contact deleted",
    })
    if (!result) {
      throw HttpError(404, `Not found`);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error){
      throw HttpError(400, error.message);
    }
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
