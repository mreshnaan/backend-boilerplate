import {
  AppError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  ValidationError,
} from '@/errors';
import { HTTP_STATUS } from '@/constants/index';

describe('Custom Error Classes', () => {
  describe('AppError', () => {
    it('should create an error with message and status code', () => {
      const error = new AppError('Test error', 500);

      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.isOperational).toBe(true);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('NotFoundError', () => {
    it('should create a 404 error with default message', () => {
      const error = new NotFoundError();

      expect(error.message).toBe('Resource not found');
      expect(error.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
      expect(error.statusCode).toBe(404);
    });

    it('should create a 404 error with custom message', () => {
      const error = new NotFoundError('User not found');

      expect(error.message).toBe('User not found');
      expect(error.statusCode).toBe(404);
    });
  });

  describe('BadRequestError', () => {
    it('should create a 400 error', () => {
      const error = new BadRequestError('Invalid input');

      expect(error.message).toBe('Invalid input');
      expect(error.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
      expect(error.statusCode).toBe(400);
    });
  });

  describe('UnauthorizedError', () => {
    it('should create a 401 error', () => {
      const error = new UnauthorizedError('Please login');

      expect(error.message).toBe('Please login');
      expect(error.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
      expect(error.statusCode).toBe(401);
    });
  });

  describe('ForbiddenError', () => {
    it('should create a 403 error', () => {
      const error = new ForbiddenError('Access denied');

      expect(error.message).toBe('Access denied');
      expect(error.statusCode).toBe(HTTP_STATUS.FORBIDDEN);
      expect(error.statusCode).toBe(403);
    });
  });

  describe('ConflictError', () => {
    it('should create a 409 error', () => {
      const error = new ConflictError('Email already exists');

      expect(error.message).toBe('Email already exists');
      expect(error.statusCode).toBe(HTTP_STATUS.CONFLICT);
      expect(error.statusCode).toBe(409);
    });
  });

  describe('ValidationError', () => {
    it('should create a 422 error', () => {
      const error = new ValidationError('Validation failed');

      expect(error.message).toBe('Validation failed');
      expect(error.statusCode).toBe(HTTP_STATUS.UNPROCESSABLE_ENTITY);
      expect(error.statusCode).toBe(422);
    });
  });
});
