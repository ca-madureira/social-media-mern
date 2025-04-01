import { useDispatch } from "react-redux";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import { useGetAllUserConversationsQuery } from "../redux/chat/conversationApi";
import { toggleChat } from "../redux/chat/chatSlice";
import { IConversation } from "../interfaces";

const Conversations = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetAllUserConversationsQuery();

  const handleActiveChat = (conversation: IConversation) => {
    dispatch(
      toggleChat({
        name: conversation?.lastMessage?.receiverId?.name,
        avatar: conversation?.lastMessage?.receiverId?.avatar,
        id: conversation?.lastMessage.receiverId?._id,
      })
    );


  };

  if (isLoading) return <p>Carregando conversas...</p>;
  if (isError) return <p>Erro ao carregar conversas.</p>;

  {

  }

  return (
    <section className="overflow-y-auto scroll-chat">
      {data?.length === 0 ? (
        <p className="font-mooli text-purple-500 text-center">Não há conversas</p>

      ) : (
        data?.map((conversation: IConversation) => (
          <div key={conversation?._id}>
            <div
              className="flex border-b-2 border-purple-200 p-2 gap-2 cursor-pointer hover:bg-purple-100 "
              onClick={() => handleActiveChat(conversation)}
            >
              <img
                src={conversation?.lastMessage?.receiverId?.avatar}
                alt={conversation?.lastMessage?.receiverId?.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col w-full">
                <div className="font-semibold text-purple-700">
                  {conversation?.lastMessage?.receiverId?.name}
                </div>
                <div className="text-sm text-gray-600">
                  {conversation?.lastMessage?.message}
                </div>
              </div>

              <IoChatboxEllipsesOutline
                className="text-purple-700 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => handleActiveChat(conversation)}
              />
            </div>
          </div>
        ))
      )}
    </section>

  );
};

export default Conversations;
