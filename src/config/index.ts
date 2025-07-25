import dotenv from 'dotenv';
dotenv.config();
// import os from "os";

export const config = {
  api: {
    port: process.env.API_PORT ?? 5000,
    hostname: process.env.SERVER_HOSTNAME ?? 'http://localhost',
  },
  swagger: {
    projectName: process.env.PROJECT_NAME ?? 'Backend',
    apiBaseURL: process.env.API_BASE_URL ?? '',
  },
};
