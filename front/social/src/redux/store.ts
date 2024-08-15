import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice'; // Importe o seu apiSlice
// Importe outros reducers que você possa ter
import authReducer from '../redux/auth/authSlice'; // Exemplo de reducer para autenticação

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Adicione outros reducers aqui
    auth: authReducer,
  },
  // Adiciona o middleware da API slice para permitir caching, invalidação, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // Se você tiver necessidade de utilizar redux dev tools para desenvolvimento
});

// Tipos para uso com TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
