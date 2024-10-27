import sequelize from "./index"
import { DataTypes, InferAttributes, Model, CreationOptional } from "sequelize"

interface UserModel extends Model<InferAttributes<UserModel>> {
    id: number
    name: string
    email: string
    email_verified_at: Date
    created_at: Date
    updated_at: Date
}

const User = sequelize.define<UserModel>('User', {
    id: {
        primaryKey: true,
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
    }
}, {
    timestamps: false
})

export default User
