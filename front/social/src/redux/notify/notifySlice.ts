import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
  avatar: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: {
    avatar: '',
    name: '',
    email: '',
  },
};

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    notify: (state, action: PayloadAction<{ user: User }>) => {
      state.user.avatar = action.payload.user.avatar;
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
    },
  },
});

export const { notify } = notifySlice.actions;
export default notifySlice.reducer;
