/**
 * Application Messages
 * Centralized message management for consistent communication
 */

export const MESSAGES = {
  // Success Messages
  SUCCESS: {
    OPERATION_SUCCESSFUL: 'Operation completed successfully',
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    FETCHED: 'Data fetched successfully',
  },

  // Error Messages
  ERROR: {
    INTERNAL_SERVER: 'Internal server error occurred',
    NOT_FOUND: 'Resource not found',
    BAD_REQUEST: 'Invalid request data',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    CONFLICT: 'Resource already exists',
    VALIDATION_FAILED: 'Validation failed',
  },

  // User Messages
  USER: {
    CREATED: 'User created successfully',
    UPDATED: 'User updated successfully',
    DELETED: 'User deleted successfully',
    NOT_FOUND: 'User not found',
    ALREADY_EXISTS: 'User already exists',
    FETCHED: 'User data fetched successfully',
    LIST_FETCHED: 'Users list fetched successfully',
  },

  // Authentication Messages
  AUTH: {
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful',
    INVALID_CREDENTIALS: 'Invalid credentials',
    TOKEN_EXPIRED: 'Token has expired',
    TOKEN_INVALID: 'Invalid token',
    UNAUTHORIZED: 'Please authenticate',
  },

  // Validation Messages
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Invalid email format',
    INVALID_PASSWORD: 'Password must be at least 8 characters',
    INVALID_ID: 'Invalid ID format',
    INVALID_FORMAT: 'Invalid data format',
  },
} as const;
