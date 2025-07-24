import Express, { NextFunction, Request, Response } from 'express';
import sequelize from './config/database';
import cors from 'cors';
import router from './routers/routes';
import cookieParser from 'cookie-parser';

const app = Express();
const PORT = 8080;
const corsOptional = {
  origin: 'http://localhost:8080',
  credentials: true,
};

app.use(Express.json());
app.use(cookieParser());
app.use(Express.urlencoded({ extended: true }));
app.use(cors(corsOptional));

app.use('/api/v1', router);
app.get('/health', (req: Request, res: Response) => {
  res.send('Alooo');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'rota não encontrada.' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ err });
});

const startDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
};

startDatabase();
