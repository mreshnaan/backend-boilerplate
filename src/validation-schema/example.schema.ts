import Joi, { type SchemaMap } from 'joi';

export const createExampleSchema: SchemaMap = {
  body: Joi.object({
    name: Joi.string().required().messages({
      'string.empty': 'Name cannot be empty', // custom message
      'any.required': 'Name is required',
    }),
    description: Joi.string().required(),
  }),
};
export const getExampleListSchema: SchemaMap = {
  query: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(100).optional(),
  }),
};

export const updateExampleSchema: SchemaMap = {
  body: Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
  }),
};
