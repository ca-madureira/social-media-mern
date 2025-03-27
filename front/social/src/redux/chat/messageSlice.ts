import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessagesState, Message } from "../../interfaces";

const initialState: MessagesState = {
  messages: [],
  unreadMessages: new Set(),
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
      state.unreadMessages.add(action.payload.conversationId);
    },
    markConversationAsRead(state, action: PayloadAction<string>) {
      state.unreadMessages.delete(action.payload); // Remove a conversa do conjunto de não lidas
    },
  },
});

export const { addMessage, markConversationAsRead } = messageSlice.actions;
export default messageSlice.reducer;
