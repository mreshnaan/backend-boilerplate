import { Request } from 'express';

/**
 * Extended Express Request type with custom properties
 */

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Pagination Query Parameters
 */

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Generic API Response Type
 */

export interface ApiResponseType<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
