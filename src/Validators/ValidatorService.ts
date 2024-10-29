import {Request, Response, NextFunction } from "express";
import {z, ZodError} from "zod";
import {STATUS_CODES} from "node:http";

import { RESPONSE_CODES } from '../utils/response'

export function validate(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        schema.parse(req.body);

        next();
    };
}

export function parseErrorResponse(error: ZodError, res: Response): void {
    const errorMessages = error.errors.map((issue: any) => ({
        message: `${issue.path.join('.')} is ${issue.message}`,
    }))

    res.status(RESPONSE_CODES.UNPROCESSABLE_ENTITY).json({ error: 'Invalid data', details: errorMessages })
}