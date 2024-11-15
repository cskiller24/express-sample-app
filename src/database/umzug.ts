// import { Umzug } from 'umzug'
// import { Sequelize } from 'sequelize'
// import path = require('path')
// import fs = require('fs')
// import 'dotenv/config'

// const getRawSqlClient = () => {
//   // @ts-ignore
// 	const sequelize = new Sequelize({
//     dialect: 'mysql',
//     database: 'test_project',
//     host: 'localhost',
//     username: 'root',
//     password: '',
//     port: 3306,
//   });

// 	return {
// 		query: async (sql: string, values?: unknown[]) => sequelize.query(sql, { bind: values }),
// 	};
// };

// export const migrator = new Umzug({
//   migrations: {
// 		glob: ['migrations/*.sql', { cwd: __dirname }],
// 		resolve(params) {
// 			const downPath = path.join(path.dirname(params.path!), 'down', path.basename(params.path!));
// 			return {
// 				name: params.name,
// 				path: params.path,
// 				up: async () => params.context.query(fs.readFileSync(params.path!).toString()),
// 				down: async () => params.context.query(fs.readFileSync(downPath).toString()),
// 			};
// 		},
// 	},
// 	context: getRawSqlClient,
// 	storage: {
// 		async executed({ context: client }) {
// 			await client.query(`create table if not exists my_migrations_table(name text)`);
// 			const [results] = await client.query(`select name from my_migrations_table`);
//       // @ts-ignore
// 			return results.map((r: { name: string }) => r.name);
// 		},
// 		async logMigration({ name, context: client }) {
// 			await client.query(`insert into my_migrations_table(name) values ($1)`, [name]);
// 		},
// 		async unlogMigration({ name, context: client }) {
// 			await client.query(`delete from my_migrations_table where name = $1`, [name]);
// 		},
// 	},
// 	logger: console,
// 	create: {
// 		folder: 'migrations',
// 	},
// });

import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from './sequelize';

export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;
