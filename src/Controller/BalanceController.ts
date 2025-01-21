import { NextFunction, Response, Request } from 'express';
import { Balance } from '../Models';
import {
  BalanceStoreRequest,
  BalanceUpdateRequest,
} from '../Validators/BalanceSchema';
import { RESPONSE_CODES } from '../utils/response';
import { AuthRequest } from '../Types';
import { UnauthorizedError } from 'express-jwt';

class BalanceController {
  static async index(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.auth) {
        throw UnauthorizedError;
      }

      Balance.findAll({
        where: {
          user_id: req.auth().id,
        },
      }).then((balances) => {
        res.json(balances);
      });
    } catch (err) {
      next(err);
    }
  }

  static async store(
    req: BalanceStoreRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.auth) {
        throw UnauthorizedError;
      }

      const { id } = req.auth();
      const { amount, description, type } = req.body;

      res.status(RESPONSE_CODES.CREATED).json(
        await Balance.create({
          user_id: id,
          amount: amount,
          description: description,
          type: type,
        })
      );
    } catch (err) {
      next(err);
    }
  }

  static async update(
    req: BalanceUpdateRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.auth) {
        throw UnauthorizedError;
      }

      const { balanceId } = req.params;
      const { amount, description, type } = req.body;

      const balance = await Balance.findByPk(balanceId);

      if (!balance) {
        res
          .status(RESPONSE_CODES.NOT_FOUND)
          .json({ message: 'No balance found' });

        return;
      }

      const updateData = Object.fromEntries(
        Object.entries({ amount, description, type }).filter(
          ([_, value]) => value !== undefined
        )
      );

      await balance.update(updateData);

      res.json(balance);
    } catch (err) {
      next(err);
    }
  }

  static async destroy(
    req: AuthRequest<{ balanceId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.auth) {
        throw UnauthorizedError;
      }
      const { balanceId } = req.params;

      const balance = await Balance.findByPk(balanceId);

      if (!balance) {
        res
          .status(RESPONSE_CODES.NOT_FOUND)
          .json({ message: 'No balance found' });

        return;
      }

      balance.destroy();

      res.status(RESPONSE_CODES.NO_CONTENT).json({
        message: 'Deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}

export default BalanceController;
