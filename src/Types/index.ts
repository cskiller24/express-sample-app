import { Request } from "express";
import { User as SequelizeUser } from "../Models";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AuthRequest extends Request {
    auth: () => User 
}
