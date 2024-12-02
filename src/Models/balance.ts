import sequelize from '../database/sequelize';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

interface BalanceModel
  extends Model<
    InferAttributes<BalanceModel>,
    InferCreationAttributes<BalanceModel>
  > {
  id: CreationOptional<number>;
  user_id: number;
  amount: number;
  description: string;
  type: string;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const Balance = sequelize.define<BalanceModel>(
  'Balance',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: 'balances',
  }
);

export const BALANCE_TYPES = {
  BALANCE_DEPOSIT: 'deposit',
  BALANCE_WITHDRAWAL: 'withdraw',
};

export default Balance;
