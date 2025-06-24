const Joi = require('joi');

const createUserSchema = Joi.object({
    username: Joi.string().min(3).required().messages({
        'string.empty': 'Username is required',
        'string.min': 'The username must have at least 3 characters',
        'string.base': 'Username must be a string'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email is not valid',
    }),
});

const updateUserSchema = Joi.object({
    username: Joi.string().optional(),
    email: Joi.string().email().optional()
}).min(1);

const idParamSchema = Joi.object({
    id: Joi.number().required().messages({
        'number.base': 'Id must be a number',
        'number.empty': 'Id is required',
        'number.min': 'Id must be greater than 0',
        'number.integer': 'Id must be an integer'
    })
});

module.exports = { createUserSchema, updateUserSchema, idParamSchema };