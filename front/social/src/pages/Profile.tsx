import Header from '../components/Header';
import PostEdit from '../components/PostEdit';
import Post from '../components/Post';
import Friends from '../components/Friends';
import ProfileCard from '../components/ProfileCard';
import ModalPost from '../components/ModalPost';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../redux/user/userApi';

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const { id } = useParams();

  const { data: friend } = useGetUserQuery({ id }, { skip: !id });

  const isLoggedIn = !id || auth?.id === id;
  const userData = friend;

  return (
    <>
      <Header />
      <main className="flex flex-col md:flex-row space-y-2 md:justify-evenly md:mt-4">
        <ProfileCard user={userData} isLoggedIn={isLoggedIn} />

        <section className="flex flex-col md:w-2/5 items-center space-y-2 md:space-y-4">
          {isLoggedIn && (
            <PostEdit user={userData} setOpenModal={setOpenModal} />
          )}

          <Post user={userData} />
        </section>

        <Friends user={userData} />
      </main>

      {openModal && isLoggedIn && (
        <ModalPost openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
};

export default Profile;
