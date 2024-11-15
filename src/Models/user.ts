import sequelize from '../database/sequelize';
import {
  DataTypes,
  InferAttributes,
  Model,
  CreationOptional,
  InferCreationAttributes,
} from 'sequelize';

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
  email_verified_at: CreationOptional<Date>;
  created_at: CreationOptional<Date>;
  updated_at: CreationOptional<Date>;
}

const User = sequelize.define<UserModel>(
  'User',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email_verified_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: 'users',
  }
);

export default User;
