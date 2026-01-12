import { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import config from '@/config';

/**
 * CORS Middleware Configuration
 * Handles Cross-Origin Resource Sharing with customizable options
 */

// Whitelist of allowed origins
const allowedOrigins = [
  config.cors.origin,
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173', // Vite default
  'http://localhost:5174',
  // Add your production domains here
  // 'https://yourdomain.com',
  // 'https://www.yourdomain.com',
];

// CORS options configuration
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) {
      return callback(null, true);
    }

    // Check if origin is in whitelist or if we're allowing all origins
    if (config.cors.origin === '*' || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    }
  },
  credentials: true, // Allow cookies and authorization headers
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // 24 hours - how long the results of a preflight request can be cached
};

/**
 * CORS middleware with custom configuration
 */
export const corsMiddleware = cors(corsOptions);

/**
 * Custom CORS error handler
 */
export const handleCorsError = (err: Error, _req: Request, res: Response, next: NextFunction): void => {
  if (err.message.includes('CORS')) {
    res.status(403).json({
      success: false,
      message: 'CORS policy violation',
      error: err.message,
    });
    return;
  }
  next(err);
};

/**
 * Simple CORS middleware (for development/testing)
 * Allows all origins - use with caution!
 */
export const corsSimple = cors({
  origin: '*',
  credentials: true,
});

/**
 * Strict CORS middleware (for production)
 * Only allows specified origins
 */
export const corsStrict = (allowedOrigins: string[]) => {
  return cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
};
