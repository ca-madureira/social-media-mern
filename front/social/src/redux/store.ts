import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer, { AuthState } from '../redux/auth/authSlice';
import postReducer, { PostState } from '../redux/post/postSlice';
import friendReducer, { FriendData } from '../redux/friend/friendSlice';
import notifyReducer from '../redux/notify/notifySlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    post: postReducer,
    friend: friendReducer,
    notify: notifyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Tipos para uso com TypeScript
export type RootState = {
  auth: AuthState;
  post: PostState; // Certifique-se de exportar e usar o tipo correto para o estado do post
  friend: FriendData;
  notify: AuthState;
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
};
export type AppDispatch = typeof store.dispatch;
