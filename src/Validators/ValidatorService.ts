import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

import { RESPONSE_CODES } from '../utils/response';

export function validate(
  schema: z.ZodObject<any, any> | z.ZodEffects<any, any>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(schema)
      await schema.parseAsync(req.body);
      
      next();
    } catch(err) {
      next(err)
    }
  };
}

export function parseErrorResponse(error: ZodError, res: Response): void {
  const errorMessages = error.errors.map((issue: any) => ({
    message: `${issue.path.join('.')} is ${issue.message}`,
  }));

  res
    .status(RESPONSE_CODES.UNPROCESSABLE_ENTITY)
    .json({ error: 'Invalid data', details: errorMessages });
}
