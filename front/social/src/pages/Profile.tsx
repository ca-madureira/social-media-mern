import Header from "../components/Header";
import PostEdit from "../components/PostEdit";
import Post from "../components/Post";
import Friends from "../components/Friends";
import ProfileCard from "../components/ProfileCard";
import Chat from "../components/Chat";
import ModalPost from "../components/ModalPost";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../redux/user/userApi";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const { id } = useParams();

  const { data: friend } = useGetUserQuery({ id }, { skip: !id });

  const isLoggedIn = !id || auth?.id === id;
  const userData = friend;

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <section className="flex flex-col md:flex-row space-y-2 md:justify-evenly md:mt-4">
          <ProfileCard user={userData} isLoggedIn={isLoggedIn} />

          <section className="flex flex-col md:w-2/5 items-center space-y-2 md:space-y-4">
            {isLoggedIn && (
              <PostEdit user={userData} setOpenModal={setOpenModal} />
            )}

            <Post user={userData} />
          </section>
          <section className="w-[35%] flex flex-col gap-4">
            <Friends user={userData} />
            <section className="p-4 bg-white shadow-md shadow-purple-600 flex flex-col gap-2 h-[70%] overflow-y-auto">
              <h4 className="text-lg font-bold mb-2 text-purple-700">
                Conversas
              </h4>
              <section
                onClick={() => setOpenChat(!openChat)}
                className="flex bg-white border w-full border-red-700 self-end items-center gap-2 border border-purple-300 rounded-md px-2 relative cursor-pointer"
              >
                <img
                  className="w-8 h-8 border border-2 rounded-full border-purple-400"
                  src="https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"
                />
                <div className="flex flex-col ">
                  <p className="font-semibold">João</p>
                  <p className="text-sm">Estou doente</p>
                  <div className="absolute bg-purple-700 w-6 h-6 rounded-full right-0 text-white font-bold text-sm/6 text-center">
                    12
                  </div>
                </div>
              </section>
              <section className="flex bg-white border w-full border-red-700 self-end items-center gap-2 border border-purple-300 rounded-md px-2">
                <img
                  className="w-8 h-8 border border-2 rounded-full border-purple-400"
                  src="https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">João</p>
                  <p className="text-sm">Estou doente</p>
                </div>
              </section>
              <section className="flex bg-white border w-full border-red-700 self-end items-center gap-2 border border-purple-300 rounded-md px-2">
                <img
                  className="w-8 h-8 border border-2 rounded-full border-purple-400"
                  src="https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">João</p>
                  <p className="text-sm">Estou doente</p>
                </div>
              </section>
              <section className="flex bg-white border w-full border-red-700 self-end items-center gap-2 border border-purple-300 rounded-md px-2">
                <img
                  className="w-8 h-8 border border-2 rounded-full border-purple-400"
                  src="https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"
                />
                <div className="flex flex-col">
                  <p className="font-semibold">João</p>
                  <p className="text-sm">Estou doente</p>
                </div>
              </section>
            </section>
          </section>
        </section>

        {openChat && <Chat />}
      </main>

      {openModal && isLoggedIn && (
        <ModalPost openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
};

export default Profile;
