import { Request, Response } from "express";

class HomeController {
    static index(req: Request, res: Response){
        res.json({'test': 13123});
    }
}

export default HomeController;