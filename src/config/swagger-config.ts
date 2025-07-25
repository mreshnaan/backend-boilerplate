import swaggerJSDoc from 'swagger-jsdoc';
import { config } from './index';

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: `${config.swagger.projectName} API`,
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${config.api.port}`,
      },
      {
        url: config.swagger.apiBaseURL,
      },
    ],
    tags: [
      {
        name: 'backend Application',
        description: 'API related to backend application',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    schemes: ['http', 'https'],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerV2Spec = swaggerJSDoc(options);
