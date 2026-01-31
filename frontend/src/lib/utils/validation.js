import Joi from 'joi';

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

const songSchema = Joi.object({
  actId: Joi.string().uuid().optional(),
  setId: Joi.string().uuid().optional(),
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().max(1000).allow('').optional(),
  genre: Joi.string().max(50).allow('').optional(),
  tempo: Joi.string().max(50).allow('').optional()
});

const actSchema = Joi.object({
  name: Joi.string().min(1).max(200).required(),
  description: Joi.string().max(1000).allow('').optional()
});

const userActSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  role: Joi.string().max(100).optional()
});

const setSchema = Joi.object({
  actId: Joi.string().uuid().required(),
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().max(1000).allow('').optional()
});

export {
  validateBody,
  userSchema,
  songSchema,
  actSchema,
  userActSchema,
  setSchema
};
