import { z } from 'zod';

/**
 * User Validation Schemas
 */

export const userSchemas = {
  create: z.object({
    body: z.object({
      email: z.string().email('Invalid email format'),
      name: z.string().min(2, 'Name must be at least 2 characters').optional(),
      password: z.string().min(8, 'Password must be at least 8 characters'),
      role: z.enum(['admin', 'user', 'moderator']).optional(),
    }),
  }),

  update: z.object({
    params: z.object({
      id: z.string().uuid('Invalid user ID'),
    }),
    body: z.object({
      email: z.string().email('Invalid email format').optional(),
      name: z.string().min(2, 'Name must be at least 2 characters').optional(),
      role: z.enum(['admin', 'user', 'moderator']).optional(),
      isActive: z.boolean().optional(),
    }),
  }),

  getById: z.object({
    params: z.object({
      id: z.string().uuid('Invalid user ID'),
    }),
  }),

  list: z.object({
    query: z.object({
      page: z.string().optional(),
      limit: z.string().optional(),
      sortBy: z.string().optional(),
      sortOrder: z.enum(['asc', 'desc']).optional(),
    }),
  }),
};
