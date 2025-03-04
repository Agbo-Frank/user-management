import dayjs from 'dayjs';
import {Request, Response, NextFunction} from 'express';

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const {method, url} = req;
  const start = process.hrtime();
  const timestamp = dayjs().format('DD/MM/YY HH:mm:ss');

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const elapsedTime = (seconds * 1e3 + nanoseconds / 1e6).toFixed(3);
    console.log(
      'request:',
      `[${timestamp}] ${method.toUpperCase()} • ${url} • (${elapsedTime})ms`,
    );
  });

  next();
};

export default requestLogger;
