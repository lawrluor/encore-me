const Joi = require('joi');

const validateBody = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    return { valid: false, errors };
  }

  return { valid: true, value };
};

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(50).optional()
});

const itemSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().max(1000).optional(),
  status: Joi.string().valid('active', 'inactive', 'pending').optional()
});

module.exports = {
  validateBody,
  userSchema,
  itemSchema
};
