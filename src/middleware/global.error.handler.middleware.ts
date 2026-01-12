import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/errors';
import { ErrorHandler } from '@/utils/error.handler.utils';
import { HTTP_STATUS } from '@/constants/http.status.constant';
import logger from '@/config/logger';

/**
 * Global Error Handler Middleware
 * Catches all errors and sends appropriate responses
 */

export const globalErrorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(`Error: ${err.message}`);

  // Handle custom AppError instances
  if (err instanceof AppError) {
    return ErrorHandler.sendError(res, err.message, err.statusCode);
  }

  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
    return ErrorHandler.sendError(res, 'Database operation failed', HTTP_STATUS.BAD_REQUEST);
  }

  // Handle Prisma validation errors
  if (err.name === 'PrismaClientValidationError') {
    return ErrorHandler.sendError(
      res,
      'Invalid data provided to database',
      HTTP_STATUS.BAD_REQUEST
    );
  }

  // Handle Prisma connection errors
  if (err.name === 'PrismaClientInitializationError') {
    return ErrorHandler.internalError(res, 'Database connection failed');
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ErrorHandler.sendError(res, 'Invalid token', HTTP_STATUS.UNAUTHORIZED);
  }

  if (err.name === 'TokenExpiredError') {
    return ErrorHandler.sendError(res, 'Token expired', HTTP_STATUS.UNAUTHORIZED);
  }

  // Handle MongoDB/Mongoose errors (if using MongoDB)
  if (err.name === 'CastError') {
    return ErrorHandler.sendError(res, 'Invalid ID format', HTTP_STATUS.BAD_REQUEST);
  }

  if (err.name === 'ValidationError') {
    return ErrorHandler.sendError(res, 'Validation failed', HTTP_STATUS.UNPROCESSABLE_ENTITY);
  }

  // Default error response
  return ErrorHandler.internalError(res, 'Internal server error');
};

/**
 * 404 Not Found Handler
 */
export const notFoundHandler = (_req: Request, res: Response) => {
  return ErrorHandler.sendError(res, 'Route not found', HTTP_STATUS.NOT_FOUND);
};
