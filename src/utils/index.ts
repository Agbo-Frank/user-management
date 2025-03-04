import { Response, Request } from 'express';
import { validationResult } from 'express-validator';

import { UnprocessableContent } from './service-error';
import { IPagination } from './interface';
import { Knex } from 'knex';

export const responsHandler = (res: Response, status: number, message: string, data: any = null) => {
  res.status(status).json({
    status: status,
    error: /^4/.test(status.toString()) ? true : false,
    message: message,
    data,
  });
};

export const validateRequest = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg;
    throw new UnprocessableContent(message, errors.array());
  }
};

export const extractPagingParams = (req: Request): IPagination => {
  let { limit = 25, page = 1 } = req.query

  page = Number(page)
  limit = Number(limit)

  const offset = (page - 1) * limit;

  return { offset, page, limit, ...req.query };
};

export const filterGenerator = (queryBuilder: Knex.QueryBuilder, payload: object, searchFields: string[] = []) => {
  return Object.entries(payload).reduce((qb, [field, value]) => {
    if (!searchFields.includes(field) || isEmpty(value)) return qb;

    return qb.where(field, value);
  }, queryBuilder);
};

export const compareStrings = (str1: string, str2: string) => {
  return str1?.toLowerCase().trim() === str2?.toLowerCase().trim();
};

export const isEmpty = (mixedVar: any) => {
  let undef;
  let key;
  let i;
  let len;
  const emptyValues = [undef, null, false, 0, '', '0', 'null', 'undefined'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i] || typeof mixedVar === 'undefined') {
      return true;
    }
  }

  if (typeof mixedVar === 'object' && !(mixedVar instanceof Date)) {
    for (key in mixedVar) {
      if (Object.prototype.hasOwnProperty.call(mixedVar, key)) {
        return false;
      }
    }
    return true;
  }
  return false;
};
