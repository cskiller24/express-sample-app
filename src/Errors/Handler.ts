import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from './UnauthorizedError';
import { ZodError } from 'zod';
import { parseErrorResponse } from '../Validators/ValidatorService';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if(err instanceof UnauthorizedError) {
    err.withResponse(res);
  }

  if(err instanceof ZodError) {
    parseErrorResponse(err, res)
  }

  next(err);
}