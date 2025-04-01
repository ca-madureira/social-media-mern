import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatState } from "../../interfaces";


const initialState: ChatState = {
  chatActive: false,
  name: "",
  avatar: "",
  id: "",
  messages: [],
  unreadMessages: {},
  listUsersOnline: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleChat(
      state,
      action: PayloadAction<{ name: string; avatar: string; id: string }>
    ) {
      if (state.chatActive) {
        state.chatActive = false;
      } else {
        state.chatActive = true;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
        state.messages = [];
        state.unreadMessages[action.payload.id] = 0;
      }
    },

    setOnlineUsers(
      state,
      action: PayloadAction<{ userId: string; socketId: string }[]>
    ) {
      state.listUsersOnline = action.payload;
    },
  },
});

export const { toggleChat, setOnlineUsers } =
  chatSlice.actions;

export default chatSlice.reducer;
