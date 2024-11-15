import { runMigrations } from '../../database/umzug.js';
import database from '../../Models/database';

const dropAll = async () => {
  await database.authenticate();
  await database.dropAllSchemas({logging: true});

  runMigrations().then(() => {

  });
};

dropAll().then(r => (console.log('Done!')));