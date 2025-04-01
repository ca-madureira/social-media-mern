import { AiOutlineUserDelete } from "react-icons/ai";
import { IoLogOutOutline, IoSettingsSharp } from "react-icons/io5";
import { FaHome, FaUserFriends } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDeleteAccountMutation } from "../redux/auth/authApi";
import { userLoggedOut } from "../redux/auth/authSlice";
import ModalConfirm from "./ModalConfirm";
import { RootState } from "../redux/store";
import { setUser } from "../redux/user/userSlice";
import { useSearchUsersQuery } from "../redux/auth/authApi";
import { useSocket } from "../hooks/useSocket";
import { UserSearch } from "../interfaces";
import {
  useAllInvitesQuery,
  useAcceptInviteMutation,
  useDeclineInviteMutation,
} from "../redux/user/userApi";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const [openMenu, setOpenMenu] = useState(false);
  const [openInvites, setOpenInvites] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [acceptInvite] = useAcceptInviteMutation();
  const [declineInvite] = useDeclineInviteMutation();
  const [deleteAccount] = useDeleteAccountMutation();
  const auth = useSelector((state: RootState) => state.auth);

  const id = auth.id;
  const { data = { invites: [] }, refetch } = useAllInvitesQuery({ id });

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: searchResults } = useSearchUsersQuery(
    { name: searchTerm, email: searchTerm },
    { skip: !searchTerm }
  );

  const { logoutUser } = useSocket();

  const deleteUser = async () => {
    await deleteAccount(auth.id);
    navigate("/login");
  };

  const logout = () => {
    logoutUser(id);
    dispatch(userLoggedOut());

    navigate("/login");
  };

  console.log("A LISTA DE CONVITES", data.invites);

  const handleHome = () => {
    dispatch(
      setUser({
        id: auth.id,
        name: auth.name,
        email: auth.email,
        avatar: auth.avatar,
        friends: auth.friends,
        invites: auth.invites,
      })
    );
    navigate(`/${auth.id}`);
  };

  const accept = async (id: string | undefined) => {
    if (!id) return;
    try {
      await acceptInvite({ id });

      refetch();
    } catch (error) {
      console.error("Erro ao aceitar o convite:", error);
    }
  };

  const handleFriendClick = (friend: UserSearch) => {
    dispatch(setUser(user));
    navigate(`/${friend._id}`);
    console.log(friend);
  };

  const decline = async (id: string | undefined) => {
    if (!id) return;
    try {
      await declineInvite({ id });

      refetch();
    } catch (error) {
      console.error("Erro ao recusar o convite:", error);
    }
  };

  return (
    <>
      <header className="relative bg-purple-500 w-full">
        <div className="flex container mx-auto justify-between items-center gap-2 p-4">
          <h1 className="text-xl text-white font-semibold hidden md:flex">AmizApp</h1>

          <div className="relative w-full max-w-md">
            <input
              className="px-2 outline-none p-2 bg-purple-300 w-full placeholder-white"
              type="search"
              placeholder="Pesquisar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full bg-purple-700 p-2 text-white">
              <FaSearch />
            </button>

            {searchTerm &&
              searchResults?.users &&
              searchResults.users.length > 0 && (
                <div className="absolute left-0 top-full mt-2 bg-white w-full z-10 shadow-lg rounded-md md:p-4">
                  {searchResults.users.map((user: UserSearch) => (
                    <div
                      key={user._id}
                      className="flex items-start cursor-pointer hover:bg-purple-100 p-2"
                      onClick={() => handleFriendClick(user)}
                    >
                      <img
                        src={user.avatar}
                        alt={`${user.name} avatar`}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div className="flex flex-col w-full overflow-hidden">
                        <span className="font-semibold truncate">
                          {user.name}
                        </span>
                        <span className=" truncate">{user.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>

          <div className="flex">
            <button
              className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded-md"
              onClick={handleHome}
            >
              <FaHome className="text-white w-6 h-6" />
              <span className="sr-only">Home</span>
            </button>
            <div className="relative flex items-center gap-2 hover:bg-purple-700 p-2 rounded-md">
              {data.invites.length > 0 && (
                <span className="absolute top-0 right-0 bg-purple-800 w-4 h-4 rounded-full text-xs text-center text-white">
                  {data.invites.length}
                </span>
              )}
              <button onClick={() => setOpenInvites(!openInvites)}>
                <FaUserFriends className="text-white w-6 h-6" />
                <span className="sr-only">Convites</span>
              </button>
            </div>
            <button
              className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded-md"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <IoSettingsSharp className="text-white w-6 h-6" />
              <span className="sr-only">Configurações</span>
            </button>
          </div>
        </div>
      </header>

      {openMenu && (
        <nav className="absolute right-0 z-20 bg-purple-600 w-40 p-2">
          <ul>
            <li
              className="flex text-white p-2 gap-2 cursor-pointer hover:bg-purple-700"
              onClick={logout}
            >
              <IoLogOutOutline className="w-6 h-6" /> Sair
            </li>
            <hr />
            <li
              className="flex text-white p-2 gap-2 cursor-pointer hover:bg-purple-700"
              onClick={() => setOpenModalConfirm(true)}
            >
              <AiOutlineUserDelete className="w-6 h-6" /> Excluir conta
            </li>
          </ul>
        </nav>
      )}

      {openInvites && (
        <aside className="absolute top-16 right-0 p-4 bg-purple-600 shadow-lg rounded-lg z-30 max-w-sm">
          <ul>
            {data.invites.length > 0 ? (
              data.invites.map((invite) => (
                <article
                  className="text-white flex flex-col gap-2 mb-4"
                  key={invite._id}
                >
                  <header className="flex flex-col items-center">
                    <p>{invite.name}</p>
                    <p className="text-xs">{invite.email}</p>
                  </header>
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 bg-orange-600 rounded-md"
                      onClick={() => decline(invite._id)}
                    >
                      Recusar
                    </button>
                    <button
                      className="p-2 bg-purple-500 rounded-md"
                      onClick={() => accept(invite._id)}
                    >
                      Aceitar
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-white font-semibold">Nenhum convite</p>
            )}
          </ul>
        </aside>
      )}


      {openModalConfirm && (
        <ModalConfirm
          deleteUser={deleteUser}
          setOpenModalConfirm={setOpenModalConfirm}
        />
      )}
    </>
  );
};

export default Header;
