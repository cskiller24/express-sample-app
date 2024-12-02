import HomeController from '../Controller/HomeController';
import AuthController from '../Controller/AuthController';
import { validate } from '../Validators/ValidatorService';
import { loginSchema, registerSchema } from '../Validators/AuthSchema';
import { User } from '../Models';
import { authenticated } from '../Middleware/Authenticated';
import BalanceController from '../Controller/BalanceController';
import { Router } from 'express';
import { storeSchema as balanceStoreSchema, updateSchema as balanceUpdateSchema, storeSchema } from '../Validators/BalanceSchema';

const router: Router = Router();

router.get('/', HomeController.index);

router.get('/users', (req, res) => {
  User.findAll().then((users) => {
    res.json(users);
  });
});

router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);

router.get('/balances', authenticated, BalanceController.index);
router.post('/balances', authenticated, validate(balanceStoreSchema), BalanceController.store);
router.put('/balances/:balanceId', authenticated, validate(balanceUpdateSchema), BalanceController.update);
router.delete('/balances/:balanceId', authenticated, BalanceController.destroy);

export default router;
