import sequelize from "./index";
import { DataTypes } from "sequelize";

const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    createAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});

export default User;
