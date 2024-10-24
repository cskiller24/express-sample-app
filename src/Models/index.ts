import 'dotenv/config'
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

export default sequelize;