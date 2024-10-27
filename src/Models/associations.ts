import User from "./user";
import Balance from "./balance";

User.hasMany(Balance)
Balance.belongsTo(User)

export { User, Balance }