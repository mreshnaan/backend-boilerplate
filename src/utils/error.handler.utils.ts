import { Response, NextFunction } from 'express';
import { HTTP_STATUS } from '@/constants/http.status.constant';
import { ApiResponse } from '@/utils/api.response.utils';
import {
  AppError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  ValidationError,
} from '@/errors';

/**
 * Error Handler Utility
 * Easy-to-use functions for throwing and sending error responses
 */

export class ErrorHandler {
  /**
   * Throw a not found error (404)
   */
  static notFound(message: string = 'Resource not found'): never {
    throw new NotFoundError(message);
  }

  /**
   * Throw a bad request error (400)
   */
  static badRequest(message: string = 'Bad request'): never {
    throw new BadRequestError(message);
  }

  /**
   * Throw an unauthorized error (401)
   */
  static unauthorized(message: string = 'Unauthorized'): never {
    throw new UnauthorizedError(message);
  }

  /**
   * Throw a forbidden error (403)
   */
  static forbidden(message: string = 'Forbidden'): never {
    throw new ForbiddenError(message);
  }

  /**
   * Throw a conflict error (409)
   */
  static conflict(message: string = 'Resource already exists'): never {
    throw new ConflictError(message);
  }

  /**
   * Throw a validation error (422)
   */
  static validationError(message: string = 'Validation failed'): never {
    throw new ValidationError(message);
  }

  /**
   * Throw a custom error with status code
   */
  static custom(message: string, statusCode: number): never {
    throw new AppError(message, statusCode);
  }

  /**
   * Send error response directly (without throwing)
   */
  static sendError(res: Response, message: string, statusCode: number = 500, error?: any) {
    return res.status(statusCode).json(ApiResponse.error(message, error));
  }

  /**
   * Send internal server error (500)
   */
  static internalError(res: Response, message: string = 'Internal server error', error?: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(ApiResponse.error(message, error));
  }

  /**
   * Catch async errors and pass to next middleware
   */
  static catchAsync(fn: Function) {
    return (req: any, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}
