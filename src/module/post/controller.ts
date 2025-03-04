import { NextFunction, Response, Request } from 'express';
import * as service from './service';
import { extractPagingParams, responsHandler, validateRequest } from '../../utils';
import { StatusCodes } from 'http-status-codes';

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateRequest(req)
    const { message, data } = await service.createPost(req.body);
    return responsHandler(res, StatusCodes.CREATED, message, data);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, data } = await service.getPosts(extractPagingParams(req));
    return responsHandler(res, StatusCodes.OK, message, data);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, data } = await service.deletePost(req.params.id);
    return responsHandler(res, StatusCodes.NO_CONTENT, message, data);
  } catch (error) {
    next(error);
  }
};