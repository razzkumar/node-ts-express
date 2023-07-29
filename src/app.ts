import cors from 'cors';
import httpStatus from 'http-status';
import createError from 'http-errors';
import express, { Express, NextFunction, Request, Response } from 'express';

import { config } from './config';
import { httpLogger } from './lib/logger';
import { handleError, AppError } from './utils/errorHandler';

import authRoutes from './modules/v1/auth/auth.routes';
import userRoutes from './modules/v1/user/user.routes';
import docsRoutes from './modules/v1/swagger/swagger.router';

export const createApp = () => {
  const app: Express = express();

  // Middlewares
  app.use(httpLogger);
  app.use(cors(config.cors));
  app.use(express.json());

  /**
   * @openapi
   * /readyz:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get('/readyz', (req: Request, res: Response) => {
    res.status(httpStatus.OK).send('OK');
  });

  // API Routes
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/users', userRoutes);

  // Docs Rotes
  app.use('/api/v1/docs', docsRoutes);

  // Catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(httpStatus.NOT_FOUND, 'Not found'));
  });

  // Central Error Handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
    error = handleError(error);

    return res.status(error.status as number).json({
      status: 'error',
      message: error.message,
      errors: error.errors,
    });
  });

  return app;
};
