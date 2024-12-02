import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../Types';
import UnauthorizedError from '../Errors/UnauthorizedError';
import AuthService from '../Services/AuthService';

export const authenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = getBearerToken(req);

  if (!token) {
    throw new UnauthorizedError();
  }

  const { id, name, email } = AuthService.validateToken(token);

  req.auth = () => {
    return {
      id: id,
      name: name,
      email: email,
    };
  };

  next();
};


const getBearerToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.split(' ')[1];
};
