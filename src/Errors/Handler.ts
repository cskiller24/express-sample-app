import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError, UnprocessableEntityError } from './index';
import { ZodError } from 'zod';
import { parseErrorResponse } from '../Validators/ValidatorService';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof UnauthorizedError || err instanceof UnprocessableEntityError) {
    err.withResponse(res);
    return;
  }

  if (err instanceof ZodError) {
    parseErrorResponse(err, res);
    return;
  }

  next(err);
}
