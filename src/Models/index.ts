import User from "./user";
import Balance from "./balance";

User.hasMany(Balance, { foreignKey: 'user_id', as: 'balance' })
Balance.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

export {
  User,
  Balance,
}