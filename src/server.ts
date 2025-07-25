/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import { swaggerV2Spec } from '@/config/swagger-config';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import exampleRoute from '@/routes/example.route';

//loggers
import expressWinston from 'express-winston';

import { HTTP_STATUS_CODE, MESSAGES, REQUEST_METHOD } from './constants/common';
import { config } from './config';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from './helpers/custom-handler';
import { logger, requestLogger } from './helpers/loggers';
import { errors } from './middlewares/error-middleware';

const app = express();

app.use(cors());

//log origin to debug
app.use((req, _, next) => {
  console.log('Origin:', req.get('Origin'));
  console.log('Credentials:', req.get('credentials'));
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  next();
});

//incoming Request Object as a JSON Object
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerV2Spec));

//logger
//get request logging
app.use(
  expressWinston.logger({
    winstonInstance: requestLogger,
    statusLevels: true,
  }),
);

//to debuge the body req and res
// this code ensures that the content of incoming request bodies
// and outgoing response bodies is included in the application logs.
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

// Define your route handlers
app.get('/', (req: Request, res: Response) => {
  try {
    if (req.method !== REQUEST_METHOD.GET) {
      throw new Error(`Invalid Method Type, Only ${REQUEST_METHOD.GET} Allowed`);
    }
    const date = '2/14/2024';
    return SUCCESS_RESPONSE(
      res,
      true,
      HTTP_STATUS_CODE.SUCCESS_RESPONSE_CODE,
      { message: `hello ${date} base route` },
      MESSAGES.DATA_SUCCESS,
    );
  } catch (error: any) {
    return ERROR_RESPONSE(
      res,
      false,
      HTTP_STATUS_CODE.SERVER_INTERNAL_ERROR_RESPONSE_CODE,
      error.message,
    );
  }
});

// routes use
app.use(`/api/v1/example`, exampleRoute);

app.use(errors);

const server = app.listen(config.api.port, function () {
  console.log('Server running on ' + config.api.hostname + ':' + config.api.port);
});

// errorLogger middleware to capture and log errors during request handling
//custom logger messages
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  }),
);

server.on('error', function (error) {
  console.error('Server startup error:', error.message);
});

export default app;
