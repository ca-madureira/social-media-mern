require('dotenv').config(); // Deve ser chamado no topo do arquivo

import { app } from './app';
import connectDB from './utils/db';

app.listen(process.env.PORT, () => {
  console.log(`Servidor está conectado na porta ${process.env.PORT}`);
  connectDB();
});
