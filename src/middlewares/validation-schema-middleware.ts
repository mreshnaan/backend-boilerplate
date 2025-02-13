/* eslint-disable no-unused-vars */
import { type Handler } from 'express';
import Joi, { type SchemaMap } from 'joi';
import { ERROR_RESPONSE } from '@/helpers/custom-handler';
import { HTTP_STATUS_CODE } from '@/constants/common';

type SuppertedKeys = 'params' | 'body' | 'query';

interface Options {
  params?: SchemaMap;
  body?: SchemaMap;
  query?: SchemaMap;
}

type ExpressJoiValidate = (schemaOptions: Options) => Handler;

/**
 * Route validation using Joi
 * Takes a schema with properties defined using Joi:
 *  - params
 *  - body
 *  - query
 * Validates the request properties specified in the schema
 * @param {Object} schema { params, body, query }
 */

const validationSchema: ExpressJoiValidate = (schema) => (req, res, next) => {
  if (!schema) {
    next();
    return;
  }

  const obj: Options = {};
  ['params', 'body', 'query'].forEach((key) => {
    const k: SuppertedKeys = key as SuppertedKeys;

    if (schema[k]) {
      obj[k] = req[k];
    }
  });

  const joiSchema = Joi.object(schema);
  const { error } = joiSchema.validate(obj);

  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message: any = details.map((i: { message: any }) => i.message).join(',');

    return ERROR_RESPONSE(res, false, HTTP_STATUS_CODE.BAD_REQUEST_RESPONSE_CODE, message);
  }
};

export default validationSchema;
