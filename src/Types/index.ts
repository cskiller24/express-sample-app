import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthRequest<P = ParamsDictionary> extends Request<P> {
  auth?: () => User;
}
