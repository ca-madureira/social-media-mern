import Slider from "react-slick";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toggleChat } from "../redux/chat/chatSlice";
import { FriendData } from "../interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/user/userSlice";

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  centerMode: true,
  focusOnSelect: true,
  centerPadding: "0",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
};

const Friends = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.auth?.id); // ID do usuário logado
  const onlineUsers = useSelector(
    (state: RootState) => state.connection.onlineUsers
  );

  const handleActiveChat = (friend: FriendData) => {
    dispatch(
      toggleChat({ name: friend.name, avatar: friend.avatar, id: friend._id })
    );
  };

  const handleFriendClick = (friend: FriendData) => {
    dispatch(setUser(user)); // Envia o usuário para o Redux
    navigate(`/${friend._id}`); // Navega para o perfil do amigo
  };

  const shouldShowSlider = user?.friends?.length > 1;

  return (
    <aside className="w-full h-[60%] bg-white shadow-md shadow-purple-600 p-2">
      <h2 className="text-lg font-mooli font-semibold mb-4 text-purple-700">
        Amigos
      </h2>
      {shouldShowSlider ? (
        <Slider {...sliderSettings}>
          {user?.friends?.map((friend: FriendData) => {
            const isOnline = onlineUsers.some(
              (user) => user.userId === friend._id
            );
            return (
              <div
                key={friend._id}
                className="flex flex-col items-center p-2 cursor-pointer"
              >
                <div
                  className={`relative w-16 h-16 rounded-full mb-2 ${
                    isOnline
                      ? "border-2 border-lime-500 "
                      : "border-2 border-purple-200"
                  }`}
                >
                  <img
                    className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform"
                    src={friend.avatar}
                    alt={`${friend.name}'s profile`}
                    onClick={() => handleFriendClick(friend)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-purple-600 font-semibold text-sm truncate">
                    {friend.name.split(" ")[0]}
                  </p>

                  {auth !== friend._id && (
                    <IoChatboxEllipsesSharp
                      className={`cursor-pointer hover:scale-110 transition-transform ${
                        isOnline
                          ? "text-lime-500 animate-pulse"
                          : "text-purple-300"
                      }`}
                      onClick={() => handleActiveChat(friend)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="flex space-x-4 justify-center">
          {user?.friends?.length > 0 ? (
            user.friends.map((friend: FriendData) => {
              const isOnline = onlineUsers.some(
                (user) => user.userId === friend._id
              );
              return (
                <div
                  key={friend._id}
                  className="flex flex-col items-center p-2 cursor-pointer"
                >
                  <div
                    className={`relative w-16 h-16 rounded-full mb-2 ${
                      isOnline
                        ? "border-2 border-lime-500 "
                        : "border-2 border-purple-200"
                    }`}
                  >
                    <img
                      className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform"
                      src={friend.avatar}
                      alt={`${friend.name}'s profile`}
                      onClick={() => handleFriendClick(friend)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-purple-600 font-semibold text-sm truncate">
                      {friend.name.split(" ")[0]}
                    </p>

                    {auth !== friend._id && (
                      <IoChatboxEllipsesSharp
                        className={`cursor-pointer hover:scale-110 transition-transform ${
                          isOnline
                            ? "text-lime-500 animate-pulse"
                            : "text-gray-500"
                        }`}
                        onClick={() => handleActiveChat(friend)}
                      />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="font-mooli text-purple-500">
              Você ainda não tem amigos.
            </p> // Mensagem exibida caso não tenha amigos
          )}
        </div>
      )}
    </aside>
  );
};

export default Friends;
