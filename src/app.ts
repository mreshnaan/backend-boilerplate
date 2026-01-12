import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import config from '@/config';
import swaggerSpec from '@/config/swagger';
import routes from '@/routes';
import { corsMiddleware, handleCorsError } from '@/middleware/cors.middleware';
import { globalErrorHandler, notFoundHandler } from '@/middleware/global.error.handler.middleware';

const app: Application = express();

// Security middleware
app.use(helmet());

// CORS middleware with custom configuration
app.use(corsMiddleware);

// Body parsing middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// HTTP request logger
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use(config.apiPrefix, routes);

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Express TypeScript API',
    version: '1.0.0',
    documentation: '/api-docs',
  });
});

// 404 handler
app.use(notFoundHandler);

// CORS error handler
app.use(handleCorsError);

// Global error handler
app.use(globalErrorHandler);

export default app;
