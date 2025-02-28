import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer, { AuthState } from "../redux/auth/authSlice";

import postReducer, { PostState } from "../redux/post/postSlice";
import friendReducer, { UserData } from "./user/userSlice";
import notifyReducer from "../redux/notify/notifySlice";
import chatReducer from "../redux/chat/chatSlice";
import { ChatState } from "./chat/chatSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    post: postReducer,
    user: friendReducer,
    notify: notifyReducer,
    chat: chatReducer,
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
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
};
export type AppDispatch = typeof store.dispatch;
