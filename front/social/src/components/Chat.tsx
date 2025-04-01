import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../redux/store";
import { useGetConversationBetweenUsersQuery } from "../redux/chat/conversationApi";
import { useCreateMessageMutation } from "../redux/chat/messageApi";
import { useSocket } from "../hooks/useSocket";
import { toggleChat } from "../redux/chat/chatSlice";
import { UserSocket } from "../interfaces";

const Chat = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const senderId = useSelector((state: RootState) => state.auth.id);
  const receiverId = useSelector((state: RootState) => state.chat.id);
  const friend = useSelector((state: RootState) => state.chat);
  const usersOnline = useSelector(
    (state: RootState) => state.connection.onlineUsers
  );
  const chatActive = useSelector((state: RootState) => state.chat.chatActive);


  const { socket, sendMessage } = useSocket();

  const {
    data: conversations,
    isLoading,
    isError,
  } = useGetConversationBetweenUsersQuery({ senderId, receiverId });

  const isUserOnline = usersOnline.some((user: UserSocket) => user.userId === receiverId);

  const [createMessage] = useCreateMessageMutation();

  const handleSendMessage = () => {
    if (message.trim()) {


      sendMessage(senderId, receiverId, message);

      createMessage({ senderId, receiverId, message })
        .then(() => {
          setMessage("");
        })
        .catch((error) => {
          console.error("Erro ao enviar a mensagem:", error);
        });
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations?.messages]);

  useEffect(() => {
    if (socket) {
      socket.on(
        "receive-message",
        (data: { senderId: string; message: string }) => {
          console.log("Mensagem recebida:", data);
        }
      );

      return () => {
        socket.off("receive-message");
      };
    }
  }, [socket]);

  const handleCloseChat = () => {
    dispatch(toggleChat({ name: "", avatar: "", id: "" }));
  };

  if (!chatActive) return null;

  return (
    <section className="border-4 border-purple-500 fixed bottom-0 right-0 z-50 bg-white w-full md:w-[275px] shadow-md shadow-purple-600">
      <section className="relative flex items-center gap-2  bg-purple-500 px-2 py-2">
        <img
          className={`w-10 h-10 border border-2 rounded-full ${isUserOnline ? "border-lime-400" : "border-purple-400"
            }`}
          src={friend.avatar || "default-avatar.png"}
          alt={`${friend.name}'s avatar`}
        />
        <div>
          <p className="text-white font-bold">{friend.name}</p>
          <p className={`${isUserOnline ? "text-lime-400 font-semibold" : ""}`}>
            {isUserOnline ? "online" : "offline"}
          </p>
        </div>
        <div
          className="absolute right-0 top-1 text-white cursor-pointer"
          onClick={handleCloseChat}
        >
          <IoMdCloseCircleOutline className="w-6 h-6 hover:text-purple-200" />
        </div>
      </section>

      <section className="overflow-y-auto h-[250px] p-2">
        {isLoading ? (
          <p>Carregando mensagens...</p>
        ) : isError ? (
          <p>Erro ao carregar mensagens</p>
        ) : conversations?.messages.length > 0 ? (
          conversations.messages.map(
            (
              message: {
                _id: string;
                senderId: string;
                receiverId: string;
                message: string;
                read: boolean;
              },
              index: number
            ) => (
              <div
                key={index}
                className={`flex ${message.senderId === senderId
                  ? "justify-end"
                  : "justify-start"
                  } mb-2`}
              >
                <div
                  className={`max-w-[70%] px-2 ${message.senderId === senderId
                    ? "border-2 rounded-md border-purple-200 bg-purple-200 text-violet-500 font-medium"
                    : "border-2 rounded-md border-violet-200 bg-violet-200 text-left font-medium"
                    } break-words`}
                >
                  <strong className="text-purple-800 text-sm">
                    {message.senderId === senderId ? "Você" : friend.name}:
                  </strong>{" "}
                  {message.message}
                </div>
              </div>
            )
          )
        ) : (
          <p>Sem mensagens no momento</p>
        )}

        <div ref={scrollRef}></div>
      </section>

      <section className="flex gap-2 p-2">
        <input
          className="border w-[90%] outline-none border border-purple-300"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-purple-500 text-sm p-2 text-white font-bold"
          onClick={handleSendMessage}
        >
          <RiSendPlaneFill />
        </button>
      </section>
    </section>
  );
};

export default Chat;
