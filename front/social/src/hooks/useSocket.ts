import { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

import { setOnlineUsers, removeUser } from "../redux/chat/connectionSlice";
import { UserSocket } from "../interfaces";

export const socket = io("http://localhost:5000");

export function useSocket() {
  const dispatch = useDispatch();

  const loginUser = (userId: string) => {
    socket.emit("new-user-add", userId);
  };

  const logoutUser = (userId: string) => {
    socket.emit("user-disconnect", userId);
    dispatch(removeUser(userId));
  };

  const sendMessage = (
    senderId: string,
    receiverId: string,
    message: string
  ) => {
    socket.emit("send-message", { senderId, receiverId, message });
  };

  useEffect(() => {
    socket.on("get-users", (users: UserSocket[]) => {
      dispatch(setOnlineUsers(users));
    });

    socket.on(
      "receive-message",
      (data: { senderId: string; message: string }) => {
        console.log("Mensagem recebida:", data);
      }
    );

    return () => {
      socket.off("get-users");
      socket.off("receive-message");
    };
  }, [dispatch]);


  return { socket, loginUser, sendMessage, logoutUser };
}
