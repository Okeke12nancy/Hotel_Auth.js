const Joi = require("joi");

const authSchema = Joi.object({
  name: Joi.string().required().max(50).min(3),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  roles: Joi.string().required().lowercase(),
});

const roomTypeSchema = Joi.object({
  codeName: Joi.string().required().min(3).max(100),
});

const roomSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  sizes: Joi.string().required(),
  roomType: Joi.string().required(),
  createdBy: Joi.string().required(),
});

module.exports = {
  authSchema,
  roomTypeSchema,
  roomSchema,
};
