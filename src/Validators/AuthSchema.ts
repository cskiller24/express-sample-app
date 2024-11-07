import { z } from 'zod';
import { Request } from 'express';

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export interface RegisterRequest extends Request {
  body: RegisterSchema;
}
