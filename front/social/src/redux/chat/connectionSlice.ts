import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSocket, UserSocketState } from "../../interfaces";

const initialState: UserSocketState = {
  onlineUsers: [],
};

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    setOnlineUsers(state, action: PayloadAction<UserSocket[]>) {
      state.onlineUsers = action.payload;
    },
    addUser(state, action: PayloadAction<UserSocket>) {
      state.onlineUsers.push(action.payload);
    },
    removeUser(state, action: PayloadAction<string>) {
      state.onlineUsers = state.onlineUsers.filter(
        (user) => user.userId !== action.payload
      );
    },
  },
});

export const { setOnlineUsers, addUser, removeUser } = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;
