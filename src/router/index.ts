import { Router } from 'express';
import HomeController from '../Controller/HomeController';
import AuthController from '../Controller/AuthController';
import { validate } from '../Validators/ValidatorService';
import { registerSchema } from '../Validators/AuthSchema';

const router: Router = Router();

router.get('/', HomeController.index);

router.post('/register', validate(registerSchema), AuthController.register);

export default router;
