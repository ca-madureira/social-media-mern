import Header from '../components/Header';
import PostEdit from '../components/PostEdit';
import Post from '../components/Post';
import Friends from '../components/Friends';
import ProfileCard from '../components/ProfileCard';
import Modal from '../components/Modal';
import { useState } from 'react';
import Notify from './Notify';
import Friend from './Friend';
import FriendPosts from '../components/FriendPost';

const Home = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Header />
      <div className="flex">
        <ProfileCard />
        <div className="">
          <PostEdit setOpenModal={setOpenModal} />
          <Post />
        </div>
        <FriendPosts />
        {openModal && (
          <Modal openModal={openModal} setOpenModal={setOpenModal} />
        )}
      </div>
    </div>
  );
};

export default Home;
