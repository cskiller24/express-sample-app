import { Router } from 'express';
import HomeController from '../Controller/HomeController';
import AuthController from '../Controller/AuthController';
import { validate } from '../Validators/ValidatorService';
import { registerSchema } from '../Validators/AuthSchema';
import { User } from '../Models';

const router: Router = Router();

router.get('/', HomeController.index);

router.get('/user', (req, res) => {
    return User.findAll().then((users) => {
        res.json(users)
    })
})

router.post('/register', validate(registerSchema), AuthController.register);

export default router;
