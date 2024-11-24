import { Router } from 'express';
import HomeController from '../Controller/HomeController';
import AuthController from '../Controller/AuthController';
import { validate } from '../Validators/ValidatorService';
import { loginSchema, registerSchema } from '../Validators/AuthSchema';
import { User } from '../Models';

const router: Router = Router();

router.get('/', HomeController.index);

router.get('/users', (req, res) => {
  User.findAll().then((users) => {
    res.json(users);
  });
});

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);

export default router;
