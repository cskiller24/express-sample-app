import { Router } from 'express';
import HomeController from "../Controller/HomeController";

const router: Router = Router();

router.get('/', HomeController.index)

export default router;