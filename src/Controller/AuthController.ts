import {Request, Response} from "express";

class AuthController {
    static login(req: Request, res: Response): void {
        AuthValidator.register()
    }

    static logout(req: Request, res: Response) {

    }

    static register(req: Request, res: Response) {

    }
}