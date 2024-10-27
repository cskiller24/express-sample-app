import { Request, Response } from "express";
import {User} from "../Models/associations";

class HomeController {
    static index(req: Request, res: Response){
        res.json({
            application_name: 'Test Project'
        })
    }
}

export default HomeController;