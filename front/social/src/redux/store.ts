import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer, { AuthState } from "../redux/auth/authSlice";

import postReducer, { PostState } from "../redux/post/postSlice";
import friendReducer, { UserData } from "./user/userSlice";
import notifyReducer from "../redux/notify/notifySlice";
import chatReducer from "./chat/chatSlice";
import connectionReducer from "./chat/connectionSlice";
import { ChatState } from "./chat/chatSlice";
import { OnlineUsersState } from "./chat/connectionSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    post: postReducer,
    user: friendReducer,
    notify: notifyReducer,
    chat: chatReducer,
    connection: connectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = {
  auth: AuthState;
  post: PostState;
  user: UserData;
  notify: AuthState;
  chat: ChatState;
  connection: OnlineUsersState;
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
};
export type AppDispatch = typeof store.dispatch;
