import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definindo a interface para o estado
export interface ChatState {
  chatActive: boolean;
  name: string;
  avatar: string;
}

// Estado inicial
const initialState: ChatState = {
  chatActive: false,
  name: "",
  avatar: "",
};

// Tipo para o payload de toggleChat
interface ToggleChatPayload {
  name: string;
  avatar: string;
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleChat(state, action: PayloadAction<ToggleChatPayload>) {
      state.chatActive = !state.chatActive; // Alterna o valor de 'chatActive'
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    },
  },
});

// Exportando as actions e o reducer
export const { toggleChat } = chatSlice.actions;
export default chatSlice.reducer;
