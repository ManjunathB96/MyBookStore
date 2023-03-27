import Joi from '@hapi/joi';

export const addressValidation = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    fullName: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    type: Joi.string().required(),
    address: Joi.string().required(),
    pinCode: Joi.number(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    addressIdx: Joi.number().integer().min(2)
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
