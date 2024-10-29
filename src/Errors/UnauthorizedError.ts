import {Response} from 'express'
import { RESPONSE_CODES } from '../utils/response';

export default class UnauthorizedError extends Error {
  withResponse(res: Response): Response
  {
    return res.status(RESPONSE_CODES.UNAUTHORIZED).json({message: 'Unauthorized'});
  }
}