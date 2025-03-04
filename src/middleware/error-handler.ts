import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isEmpty, responsHandler } from '../utils';
import { DEV_MAILS } from '../utils/config';
import dayjs from 'dayjs';
import { ServiceError } from '../utils/service-error';
import mail from '../utils/mail';

const errorHandler = async (
  err: any,
  req: Request | any,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  if (isEmpty(err)) next();

  const { method, url } = req;
  const timestamp = dayjs().format('DD/MM/YY HH:mm:ss');
  const request = `[${timestamp}] ${method.toUpperCase()} ${url}`;

  const stackLines = err?.stack?.split('\n');
  const path = stackLines?.[1]?.trim() || err;
  const message = stackLines?.[0]?.trim() || err;

  const error_payload = { request, message, path, stackLines };

  console.log('Error: ', JSON.stringify(error_payload, null, 2));

  if (err instanceof ServiceError) {
    return responsHandler(res, err.statusCode, err?.message, err?.data);
  }

  // mail.send({
  //   to: DEV_MAILS,
  //   subject: 'Japa error',
  //   text: JSON.stringify(error_payload, null, 2),
  // });
  return responsHandler(
    res,
    StatusCodes.INTERNAL_SERVER_ERROR,
    'Internal server error',
  );
};

export default errorHandler;
