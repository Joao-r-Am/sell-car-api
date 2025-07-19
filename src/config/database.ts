import { Sequelize } from 'sequelize';

const { DATABASE, DATABASE_DIALECT, DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: DATABASE as string,
  username: DATABASE_USERNAME as string,
  password: DATABASE_PASSWORD as string,
});

sequelize
  .sync()
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o modelo Aluno:', err);
  });

export default sequelize;
