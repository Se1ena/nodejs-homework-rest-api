const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `"name" is required`,
    }),
    email: Joi.string().email().required().messages({
      "any.required": `"email" is required`,
    }),
    phone: Joi.string().required().messages({
      "any.required": `"phone" is required`,
    }),
    favorite: Joi.boolean(),
  });
  
  const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
  })

  module.exports = {
    addSchema,
    updateFavoriteSchema,
  };