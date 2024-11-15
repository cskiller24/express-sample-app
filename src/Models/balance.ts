import sequelize from '../database/sequelize';
import { DataTypes, InferAttributes, Model } from 'sequelize';

interface BalanceModel extends Model<InferAttributes<BalanceModel>> {
  id: number;
  user_id: number;
  amount: number;
  description: string;
  type: string;
  created_at: Date;
}

const Balance = sequelize.define<BalanceModel>(
  'Balance',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
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
  },
  {
    timestamps: false,
  }
);

export default Balance;
