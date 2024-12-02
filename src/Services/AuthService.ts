import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User } from '../Types';
import UnauthorizedError from '../Errors/UnauthorizedError';
import { User as UserModel } from '../Models';

class AuthService {
  static generateToken({ id, email, name }: User): string {
    return jwt.sign(
      {
        id: id,
        name: name,
        email: email,
      },
      this.getSecretKey()
    );
  }

  static getSecretKey(): string {
    const key = process.env.APP_KEY;

    if (!key) {
      throw new Error('Please specify an application key in .env [APP_KEY]');
    }

    return key;
  }

  static validateToken(token: string): User {
    try {
      return jwt.verify(token, this.getSecretKey()) as User;
    } catch (err) {
      throw new UnauthorizedError('Invalid JWT Token');
    }
  }

  static isValid(token: string): boolean {
    try {
      this.validateToken(token);
      return true;
    } catch (err) {
      return false;
    }
  }

  static async userModelToSequelize(user: User) {
    return await UserModel.findByPk(user.id)
  }
}

export default AuthService;
