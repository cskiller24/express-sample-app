import { Request } from 'express';
import { User as SequelizeUser } from '../Models';
import { ParamsDictionary, Resbod } from 'express-serve-static-core';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthRequest<P = ParamsDictionary> extends Request<P> {
  auth?: () => User;
}
