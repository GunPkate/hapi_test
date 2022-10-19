const Joi = require("joi");

const userSchemaHapi = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    // "string.base": `"username" should be a type of 'text'`,
    // "string.required": `"username" is a required field`,
  }),
  birth_year: Joi.number()
    .integer()
    .min(1900)
    .max(2022)
    .rule({ message: "must between 1900 and 2022" }),
  role: Joi.string().valid("admin", "member"),
});

module.exports = userSchemaHapi;
