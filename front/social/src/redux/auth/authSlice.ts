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
  token: '',
  user: {
    name: '',
    email: '',
    id: '',
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
      state.user = action.payload.user;
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>, // Corrigido para `User`
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      console.log('to aqui', state.user.id, state.token);
    },
    userLoggedOut: (state) => {
      state.token = '';
      state.user.name = '';
      state.user.email = '';
      state.user.id = '';
      console.log('to aki', state.user.id, state.token);
    },
  },
});

export const { userRegistration, userLoggedOut, userLoggedIn } =
  authSlice.actions;
export default authSlice.reducer;
