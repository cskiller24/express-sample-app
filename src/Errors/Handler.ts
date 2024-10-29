import { Request, Response } from 'express';
import UnauthorizedError from './UnauthorizedError';
import { ZodError } from 'zod';
import { parseErrorResponse } from '../Validators/ValidatorService';

export function errorHandler(err, req: Request, res: Response) {
  console.log('rere')
  if(err instanceof UnauthorizedError) {
    err.withResponse(res);
  }

  if(err instanceof ZodError) {
    parseErrorResponse(err, res)
  }

  throw err;
}