import { NextFunction, Response, Request } from 'express';
import * as service from './service';
import { extractPagingParams, responsHandler, validateRequest } from '../../utils';
import { StatusCodes } from 'http-status-codes';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, data } = await service.getUsers(extractPagingParams(req));
    return responsHandler(res, StatusCodes.OK, message, data);
  } catch (error) {
    next(error);
  }
};

export const getUserCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, data } = await service.getUserCount();
    return responsHandler(res, StatusCodes.OK, message, data);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, data } = await service.getUserById(req.params.id);
    return responsHandler(res, StatusCodes.OK, message, data);
  } catch (error) {
    next(error);
  }
};


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateRequest(req)
    const { message, data } = await service.createUser(req.body);
    return responsHandler(res, StatusCodes.CREATED, message, data);
  } catch (error) {
    next(error);
  }
};