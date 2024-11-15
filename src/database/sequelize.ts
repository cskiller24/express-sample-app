import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/db.sqlite',
});

export default sequelize;
