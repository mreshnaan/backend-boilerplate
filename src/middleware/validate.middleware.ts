import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { HTTP_STATUS } from '@/constants/http.status.constant';
import { ApiResponse } from '@/utils/api.response.utils';

/**
 * Validation Middleware
 * Validates request body, query, or params against a Zod schema
 */

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .json(ApiResponse.error('Validation failed', errors));
        return;
      }
      next(error);
    }
  };
};

