import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  id: string;
}

export interface AuthState {
  token: string;
  user: User;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  user: {
    name: localStorage.getItem('name') || '',
    email: localStorage.getItem('email') || '',
    id: localStorage.getItem('id') || '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userRegistration: (
      state,
      action: PayloadAction<{ token: string; user: User }>,
    ) => {
      state.token = action.payload.token;
      state.user = {
        name: action.payload.user?.name || '',
        email: action.payload.user?.email || '',
        id: action.payload.user?.id || '',
      };

      // Salva os dados no localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('name', action.payload.user.name);
      localStorage.setItem('email', action.payload.user?.email);
      localStorage.setItem('id', action.payload.user?.id);
      console.log('PAYLOAD: ', action.payload);
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>,
    ) => {
      state.token = action.payload.accessToken;
      state.user = {
        name: action.payload.user?.name || '',
        email: action.payload.user?.email || '',
        id: action.payload.user?.id || '',
      };

      // Salva os dados no localStorage
      localStorage.setItem('token', action.payload.accessToken);
      localStorage.setItem('name', action.payload.user?.name);
      localStorage.setItem('email', action.payload.user?.email);
      localStorage.setItem('id', action.payload.user?.id);

      console.log('to aqui', state.user.id, state.token);
    },
    userLoggedOut: (state) => {
      state.token = '';
      state.user = {
        name: '',
        email: '',
        id: '',
      };

      // Remove os dados do localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('id');

      console.log('Usuário deslogado', state.user.id, state.token);
    },
  },
});

export const { userRegistration, userLoggedOut, userLoggedIn } =
  authSlice.actions;
export default authSlice.reducer;
