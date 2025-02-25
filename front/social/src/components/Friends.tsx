import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/user/userSlice";

type FriendData = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

const Friends = ({ user }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFriendClick = (friend: FriendData) => {
    dispatch(setUser(user));
    navigate(`/${friend._id}`);
  };

  console.log("TEM AMIGO NAO?", user?.friends);
  return (
    <aside className="md:w-full bg-white p-4 shadow-md shadow-purple-600">
      <h2 className="text-lg font-bold mb-2 text-purple-700">Amigos</h2>
      {user?.friends?.length > 0 ? (
        user.friends.map((friend: FriendData) => (
          <div
            key={friend._id}
            className="bg-purple-300 flex flex-col items-center p-2 cursor-pointer w-24 mb-2"
            onClick={() => handleFriendClick(friend)}
          >
            <img
              className="w-20 h-20 rounded-md"
              src={friend.avatar}
              alt={`${friend.name}'s profile`}
            />
            <p className="text-purple-600 font-semibold">{friend.name}</p>
          </div>
        ))
      ) : (
        <p>Não há amigos</p>
      )}
    </aside>
  );
};

export default Friends;
