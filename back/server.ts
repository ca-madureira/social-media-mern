import { app } from './app';
require('dotenv').config();
import connectDB from './utils/db';

app.listen(process.env.PORT, () => {
  console.log(`Servidor esta conectado na porta ${process.env.PORT}`);
  connectDB();
});
