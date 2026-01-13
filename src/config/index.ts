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
  auth:{
    jwt:{
      secret:string,
      expiresIn:string
    },
    password:{
      saltRounds:number
    }
  }
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
  auth:{
    jwt:{
      secret:process.env.JWT_SECRET || 'new-secret-4ghxHZVdhsa',
      expiresIn:process.env.JWT_EXPIRES_IN|| '1h'
    },
    password:{
      saltRounds:parseInt(process.env.PASSWORD_SALT_ROUNDS || '10', 10)
    }
  }
};

export default config;
