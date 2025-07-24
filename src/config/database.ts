import { Dialect, Sequelize } from 'sequelize';
require('dotenv').config();

const { DATABASE, DATABASE_DIALECT, DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

const sequelize = new Sequelize({
  dialect: DATABASE_DIALECT as Dialect,
  host: DATABASE_HOST,
  port: DATABASE_PORT as unknown as number,
  database: DATABASE,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
});

sequelize
  .sync()
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o model:', err);
  });

export default sequelize;
