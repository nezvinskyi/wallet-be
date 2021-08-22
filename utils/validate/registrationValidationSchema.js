const Joi = require('joi');

const validationSchema = newUser => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')),
  });
  const { error } = schema.validate(newUser);
  return error;
}

module.exports = validationSchema;