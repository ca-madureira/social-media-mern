import { FC } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useDeleteAccountMutation } from '../redux/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { userLoggedOut } from '../redux/auth/authSlice';

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const [deleteAccount] = useDeleteAccountMutation();

  const deleteUser = async (id: string) => {
    await deleteAccount(id);
    navigate('/login');
  };

  const logout = () => {
    dispatch(userLoggedOut());
    navigate('/login');
    // console.log('usuario: ', user);
  };
  return (
    <nav className="bg-purple-700 w-full">
      <div className="flex container mx-auto justify-between  items-center gap-2 p-4">
        <div className="text-white">FriendBook</div>
        <div className="flex items-center gap-2">
          <IoChatbubbleOutline className="text-white w-6 h-6" />
          <IoIosNotificationsOutline className="text-white w-6 h-6" />
          <IoSettingsOutline className="text-white w-6 h-6" />
          <IoLogOutOutline className="text-white w-6 h-6" onClick={logout} />
          <AiOutlineUserDelete
            onClick={() => {
              deleteUser(user.id);
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
