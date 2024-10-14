import Header from '../components/Header';
import PostEdit from '../components/PostEdit';
import Post from '../components/Post';
import Friends from '../components/Friends';
import ProfileCard from '../components/ProfileCard';
import Modal from '../components/ModalPost';
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ModalPost from '../components/ModalPost';

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const auth = useSelector((state: RootState) => state.auth.user);
  const user = useSelector((state: RootState) => state.user);

  const isLoggedIn = user._id === auth.id;

  return (
    <div>
      <Header />
      <div className="flex flex-col lg:flex-row lg:p-2 lg:space-x-6 justify-evenly">
        <ProfileCard user={user} isLoggedIn={isLoggedIn} />
        <div className="w-screen lg:w-full lg:space-y-4 lg:px-2">
          {isLoggedIn && <PostEdit setOpenModal={setOpenModal} />}
          <Post user={user} />
        </div>

        <Friends user={user} />
      </div>
      {openModal && isLoggedIn && (
        <ModalPost openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default Profile;
