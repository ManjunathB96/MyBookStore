import Joi from '@hapi/joi';

export const newBookValidator = (req, res, next) => {
  const schema = Joi.object({
    description: Joi.string().required(),
    discountPrice: Joi.number().required(),
    bookImage: Joi.string().required(),
    admin_user_id: Joi.string().required(),
    bookName: Joi.string().required(),
    author: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};


