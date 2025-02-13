import { ApiError } from '../helpers/api-errors';
import { ERROR_RESPONSE } from '../helpers/custom-handler';
import { NextFunction, Request, Response } from 'express';
import { logger } from '@/helpers/loggers';

export const errors = (
  error: Error & Partial<ApiError>,
  _: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (res.headersSent) {
    return _next(error);
  }
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : 'There was an internal server error.';

  logger.error('Unhandled Exception', error);

  return ERROR_RESPONSE(res, false, statusCode, message);
};
