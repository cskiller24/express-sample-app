import { z } from 'zod';
import Balance, { BALANCE_TYPES } from '../Models/balance';
import { AuthRequest } from '../Types';

export const storeSchema = z.object({
  amount: z.number(),
  description: z.string(),
  type: z.enum([
    BALANCE_TYPES.BALANCE_DEPOSIT,
    BALANCE_TYPES.BALANCE_WITHDRAWAL,
  ]),
});

export const updateSchema = z.object({
  amount: z.number().optional(),
  description: z.string().optional(),
  type: z
    .enum([BALANCE_TYPES.BALANCE_DEPOSIT, BALANCE_TYPES.BALANCE_WITHDRAWAL])
    .optional(),
});

type storeSchema = z.infer<typeof storeSchema>;
type updateSchema = z.infer<typeof updateSchema>;

export interface BalanceStoreRequest extends AuthRequest {
  body: storeSchema;
}

export interface BalanceWithParamsRequest extends BalanceStoreRequest {
  
}

export interface BalanceUpdateRequest extends AuthRequest {
  body: updateSchema,
  params: {
    balanceId: string;
  };
}