const Joi = require("joi");

const authSchema = Joi.object({
  name: Joi.string().required().max(50).min(3),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  roles: Joi.string().required().lowercase(),
});

module.exports = {
  authSchema,
};
