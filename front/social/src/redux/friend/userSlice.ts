// src/redux/friendSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
  _id: string;
  name: string;
  email: string;
  friends: object[];
}

const initialState: UserData = {
  _id: '',
  name: '',
  email: '',
  friends: [],
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      return { ...state, ...action.payload };
      console.log('CONTEUDO DE AGORA', action.payload);
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
