import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/user/userSlice";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import { toggleChat } from "../redux/chat/chatSlice";
import { FriendData, UserData } from "../interfaces";

const Friends = ({ user }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Função para ativar o chat com o amigo
  const handleActiveChat = (friend: FriendData) => {
    // Disparando o toggleChat com o nome e avatar do amigo
    dispatch(toggleChat({ name: friend.name, avatar: friend.avatar }));
  };

  // Função para navegação e envio de dados do usuário
  const handleFriendClick = (friend: FriendData) => {
    dispatch(setUser(user)); // Envia o usuário para o Redux
    navigate(`/${friend._id}`); // Navega para o perfil do amigo
  };

  return (
    <aside className="md:w-full bg-white p-4 shadow-md shadow-purple-600">
      <h2 className="text-lg font-bold mb-2 text-purple-700">Amigos</h2>
      <section className="flex justify-evenly">
        {user?.friends?.length > 0 ? (
          user.friends.map((friend: FriendData) => (
            <div
              key={friend._id}
              className="bg-purple-300 flex flex-col items-center p-2 cursor-pointer w-24 mb-2"
            >
              <img
                className="w-20 h-20 rounded-md"
                src={friend.avatar}
                alt={`${friend.name}'s profile`}
                onClick={() => handleFriendClick(friend)} // Navega para o perfil
              />
              <div className="flex items-center gap-2">
                <p className="text-purple-600 font-semibold">{friend.name}</p>
                <IoChatboxEllipsesOutline
                  className="text-purple-700 cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => handleActiveChat(friend)} // Ativa o chat com o amigo
                />
              </div>
            </div>
          ))
        ) : (
          <p>Não há amigos</p>
        )}
      </section>
    </aside>
  );
};

export default Friends;
