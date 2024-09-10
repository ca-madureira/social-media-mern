// src/redux/friendSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FriendData {
  _id: string;
  name: string;
  email: string;
}

const initialState: FriendData = {
  _id: '',
  name: '',
  email: '',
};

const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setFriend: (state, action: PayloadAction<FriendData>) => {
      return { ...state, ...action.payload };
      console.log(action.payload);
    },
  },
});

export const { setFriend } = friendSlice.actions;
export default friendSlice.reducer;
