require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import { ticketRouter } from './routes/ticket.routes';
import { sequelize } from './config/database';

const app = express();
app.use(helmet());
app.use(cors());
app.use(json());
app.use(express.json());
app.use('/tickets', ticketRouter);

const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Сервер крутится на ${PORT} порту!`));
  } catch (error) {
    console.error('Ошибка подключения БД', error);
  }
})();
