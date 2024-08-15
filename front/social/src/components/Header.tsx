import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoChatbubbleOutline } from 'react-icons/io5';

const Header = () => {
  return (
    <nav className="bg-purple-700 w-full">
      <div className="flex container mx-auto justify-between  items-center gap-2 p-4">
        <div className="text-white">FriendBook</div>
        <div className="flex items-center gap-2">
          <IoChatbubbleOutline className="text-white w-6 h-6" />
          <IoIosNotificationsOutline className="text-white w-6 h-6" />
          <img
            className="w-10 h-10 rounded-full"
            src="https://png.pngtree.com/element_our/png/20181206/female-avatar-vector-icon-png_262142.jpg"
            alt="Avatar"
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
