import { FC } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const Header: FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <nav className="bg-purple-700 w-full">
      <div className="flex container mx-auto justify-between  items-center gap-2 p-4">
        <div className="text-white">FriendBook</div>
        <div className="flex items-center gap-2">
          <IoChatbubbleOutline className="text-white w-6 h-6" />
          <IoIosNotificationsOutline className="text-white w-6 h-6" />
          <IoSettingsOutline className="text-white w-6 h-6" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
