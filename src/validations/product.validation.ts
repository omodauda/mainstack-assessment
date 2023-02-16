import Joi from 'joi';

const updateProductValidation = Joi.object().keys({
  category: Joi.string()
    .min(24)
    .max(24)
    .messages({
      'string.empty': 'category cannot be an empty field',
      'string.min': 'category should be minimum of 24 characters length',
      'string.max': 'category should not be more than 24 characters length',
    }),
  subcategory: Joi.string()
    .min(24)
    .max(24)
    .messages({
      'string.empty': 'subcategory cannot be an empty field',
      'string.min': 'subcategory should be minimum of 24 characters length',
      'string.max': 'subcategory should not be more than 24 characters length',
    }),
  name: Joi.string()
    .min(5)
    .max(30)
    .messages({
      'string.empty': 'name cannot be an empty field',
      'string.min': 'name should be minimum of 5 characters length',
      'string.max': 'name should not be more than 30 characters length',
    }),
  description: Joi.string()
    .min(10)
    .max(200)
    .messages({
      'string.empty': 'description cannot be an empty field',
      'string.min': 'description should be minimum of 10 characters length',
      'string.max': 'description should not be more than 200 characters length',
    }),
  price: Joi.number()
    .positive()
    .integer()
    .messages({
      'number.base': 'price must be a number',
      'number.integer': 'price should be an integer',
      'number.positive': 'price should be a positive number',
    }),
  quantity: Joi.number()
    .integer()
    .positive()
    .messages({
      'number.base': 'quantity must be a number',
      'number.integer': 'quantity should be an integer',
      'number.positive': 'quantity should be a positive number',
    })
});

export {
  updateProductValidation
};