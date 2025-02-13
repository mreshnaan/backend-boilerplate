import { createLogger, transports, format } from 'winston';
export const logsFolder = `./src/logs/`;

const loggerTransports = [
  new transports.File({
    level: 'info',
    filename: `${logsFolder}logs.log`,
  }),
];

const loggerRequestTransports = [
  new transports.File({
    level: 'warn',
    filename: `${logsFolder}requestWarnings.log`,
  }),
  new transports.File({
    level: 'error',
    filename: `${logsFolder}requestErrors.log`,
  }),
];

export const logger = createLogger({
  transports: loggerTransports,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint()),
});

export const requestLogger = createLogger({
  transports: loggerRequestTransports,
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint()),
});
