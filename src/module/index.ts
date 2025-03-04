import { Application, NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { readdirSync } from 'fs';
import { responsHandler } from '../utils';

function router(app: Application, version: string) {
  readdirSync(__dirname)
    .filter(file => !file.startsWith('.') && !file.includes('index'))
    .forEach(file => {
      const route = require(`./${file}/routes`);
      app.use(version, route.default || route);
    });

  app.get(
    version + '/health',
    async (_req: Request, res: Response, _next: NextFunction) => {
      const healthcheck = {
        uptime: process.uptime(),
        responsetime: process.hrtime(),
        message: 'OK',
        status: StatusCodes.OK,
        timestamp: Date.now(),
      };
      try {
        return responsHandler(
          res,
          StatusCodes.SERVICE_UNAVAILABLE,
          'OK',
          healthcheck,
        );
      } catch (error: any) {
        healthcheck.message = error;
        return responsHandler(
          res,
          StatusCodes.SERVICE_UNAVAILABLE,
          'Service unavailable',
          healthcheck,
        );
      }
    },
  );

  // No matching route found
  app.use((req, res, next) => {
    return responsHandler(
      res,
      StatusCodes.NOT_FOUND,
      'Resource does not exist, check endpoint or method',
    );
  });
}

export default router;
