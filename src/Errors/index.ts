import { Response } from 'express';
import { RESPONSE_CODES } from '../utils/response';

export class UnauthorizedError extends Error {
  withResponse(res: Response): Response {
    return res
      .status(RESPONSE_CODES.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }
}

export class UnprocessableEntityError extends Error {
  withResponse(res: Response): Response {
    return res.status(RESPONSE_CODES.UNPROCESSABLE_ENTITY)
      .json({message: this.message})
  }
} 