import dotenv from 'dotenv';

dotenv.config();

interface Config {
  env: string;
  port: number;
  host: string;
  apiPrefix: string;
  cors: {
    origin: string;
  };
  log: {
    level: string;
  };
}

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || 'localhost',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

export default config;
