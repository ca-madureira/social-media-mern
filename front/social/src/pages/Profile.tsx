import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";

import { useGetUserQuery } from "../redux/user/userApi";
import { useSocket } from "../hooks/useSocket";
import Header from "../components/Header";
import PostEdit from "../components/PostEdit";
import Post from "../components/Post";
import Friends from "../components/Friends";
import ProfileCard from "../components/ProfileCard";
import Chat from "../components/Chat";
import ModalPost from "../components/ModalPost";
import Conversations from "../components/Conversations";
import { UserOn } from "../components/UserOn";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const isChat = useSelector((state: RootState) => state.chat?.chatActive);

  //const { data: friend } = useGetUserQuery({ id: id! }, { skip: !id });
  const { data: friend } = useGetUserQuery({ id: id! });

  const isLoggedIn = !id || auth?.id === id;
  const userData = friend;
  console.log('informacoes do params', userData)


  const { loginUser } = useSocket();

  useEffect(() => {
    if (isLoggedIn && auth?.id) {
      loginUser(auth.id);
    }
  }, [isLoggedIn, auth?.id, loginUser]);

  return (
    <>
      <Header />
      <main className="flex flex-col relative">
        <section className="flex flex-col md:flex-row space-y-2 md:justify-evenly md:mt-4">
          <ProfileCard user={userData} isLoggedIn={isLoggedIn} />

          <section className="flex flex-col md:w-1/3 items-center space-y-2 md:space-y-4">
            {isLoggedIn && (
              <PostEdit user={userData} setOpenModal={setOpenModal} />
            )}

            <Post />
          </section>

          <section className="w-full md:w-[35%] flex flex-col gap-6">
            <Friends user={userData} />


            {isLoggedIn && (
              <section className="p-4 border-2 border-purple-300 bg-white shadow-md shadow-purple-600 flex flex-col gap-2 h-[275px] ">
                <h4 className="text-lg font-mooli font-semibold mb-4 text-purple-400">
                  Conversas
                </h4>

                <Conversations />
              </section>

            )}
          </section>
        </section>

        {isChat && <Chat />}
      </main>

      {openModal && isLoggedIn && (
        <ModalPost openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
};

export default Profile;
