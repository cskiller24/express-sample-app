import { z } from 'zod';
import { Request } from 'express';
import { User } from '../Models';

export const registerSchema = z
  .object({
    name: z.string(),
    email: z
      .string()
      .email()
      .refine(async (current) => {
        const count = await User.count({
          where: {
            email: current,
          },
        });

        return count === 0;
      }, 'Email is already taken.'),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation must match',
    path: ['password_confirmation'],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export interface RegisterRequest extends Request {
  body: RegisterSchema;
}
