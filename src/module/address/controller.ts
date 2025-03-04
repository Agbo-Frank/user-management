import { NextFunction, Response, Request } from 'express';
import * as service from './service';
import { responsHandler, validateRequest } from '../../utils';
import { StatusCodes } from 'http-status-codes';

export const createAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateRequest(req)
    const { message, data } = await service.createAddress(req.body);
    return responsHandler(res, StatusCodes.CREATED, message, data);
  } catch (error) {
    next(error);
  }
};

export const getUserAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, data } = await service.getUserAddress(req.params.user_id);
    return responsHandler(res, StatusCodes.OK, message, data);
  } catch (error) {
    next(error);
  }
};

export const updateUserAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, data } = await service.updateUserAddress(req.params.user_id, req.body);
    return responsHandler(res, StatusCodes.OK, message, data);
  } catch (error) {
    next(error);
  }
};