import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../interfaces';

export interface AuthState extends User {
  token: string;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  id: localStorage.getItem('id') || '',
  name: localStorage.getItem('name') || '',
  email: localStorage.getItem('email') || '',
  avatar: '',
  friends: [],
  invites: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userAuthentication: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.friends = action.payload.friends;
      state.invites = action.payload.invites;

      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('id', action.payload.id);
      localStorage.setItem('name', action.payload.name);
      localStorage.setItem('email', action.payload.email);
    },
    userLoggedOut: (state) => {
      state.token = '';
      state.id = '';
      state.name = '';
      state.email = '';
      state.avatar = '';
      state.friends = [];
      state.invites = [];

      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    },
  },
});

export const { userAuthentication, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
