import { NextFunction } from 'express';

class AuthService {
  static generateToken(): string {
    return '';
  }

  // static validateToken(): NextFunction|Response
  // {

  // }

  static isValid(token: string): boolean {
    return false;
  }

  static invalidateToken(token: string): void {}
}
