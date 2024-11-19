import { Request, Response } from 'express';
import { RegisterRequest } from '../Validators/AuthSchema';
import { RESPONSE_CODES } from '../utils/response';
import { User } from '../Models/index';
import { hash } from '../utils/Hash';

class AuthController {
  static login(req: Request, res: Response): void {}

  static logout(req: Request, res: Response) {}

  static async register(req: RegisterRequest, res: Response) {
    const body = req.body;

    await User.create({
      name: body.name,
      email: body.email,
      password: await hash(body.password),
    }).then((user) => {
      res.status(RESPONSE_CODES.CREATED).json({ user: user });
    });
  }
}

export default AuthController;
