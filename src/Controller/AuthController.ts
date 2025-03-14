import { NextFunction, Request, Response } from 'express';
import { LoginRequest, RegisterRequest } from '../Validators/AuthSchema';
import { RESPONSE_CODES } from '../utils/response';
import { User } from '../Models/index';
import { hash, verify } from '../utils/Hash';
import AuthService from '../Services/AuthService';
import { UnauthorizedError, UnprocessableEntityError } from '../Errors';
import { AuthRequest } from '../Types';

class AuthController {
  static async login(req: LoginRequest, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new UnprocessableEntityError('Invalid email or password');
      }

      const isPasswordValid = await verify(password, user.password);

      if (!isPasswordValid) {
        throw new UnprocessableEntityError('Invalid email or password');
      }

      const token = AuthService.generateToken({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      res.json({ name: user.name, email: user.email, token: token });
    } catch (err) {
      next(err);
    }
  }

  static logout(req: Request, res: Response) {}

  static async register(req: RegisterRequest, res: Response): Promise<void> {
    const body = req.body;

    await User.create({
      name: body.name,
      email: body.email,
      password: await hash(body.password),
    }).then((user) => {
      res.status(RESPONSE_CODES.CREATED).json({
        user: {
          name: user.name,
          email: user.email,
        },
      });
    });
  }

  static async user(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if(! req.auth) {
        throw new UnauthorizedError()
      }
      
      res.json(req.auth());
    } catch (err) {
      next(err)
    }
  }
}

export default AuthController;
