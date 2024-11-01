import { useState, FC } from 'react';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { IoLogOutOutline, IoSettingsSharp } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useDeleteAccountMutation } from '../redux/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { userLoggedOut } from '../redux/auth/authSlice';
import ModalConfirm from './ModalConfirm';
import { RootState } from '../redux/store';
import { setUser } from '../redux/user/userSlice';
import { FaHome, FaUserFriends } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { useSearchUsersQuery } from '../redux/auth/authApi';
import {
  useAllInvitesQuery,
  useAcceptInviteMutation,
  useDeclineInviteMutation,
} from '../redux/user/userApi';

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);
  const [openInvites, setOpenInvites] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [acceptInvite] = useAcceptInviteMutation();
  const [declineInvite] = useDeclineInviteMutation();
  const [deleteAccount] = useDeleteAccountMutation();
  const auth = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState(false);
  const id = auth.id;
  const { data = { invites: [] }, refetch } = useAllInvitesQuery({ id });

  const [searchTerm, setSearchTerm] = useState<string>('');

  const {
    data: searchResults,
    error,
    isLoading,
  } = useSearchUsersQuery(
    { name: searchTerm, email: searchTerm },
    { skip: !searchTerm },
  );

  const deleteUser = async () => {
    await deleteAccount(user.id);
    navigate('/login');
  };

  const logout = () => {
    dispatch(userLoggedOut());
    navigate('/login');
  };

  console.log('A LISTA DE CONVITES', data.invites);

  const handleHome = () => {
    dispatch(
      setUser({
        id: auth.id,
        name: auth.name,
        email: auth.email,
        avatar: auth.avatar,
        friends: auth.friends,
        invites: auth.invites,
      }),
    );
    navigate(`/${auth.id}`);
  };

  const accept = async (id: string | undefined) => {
    if (!id) return;
    try {
      await acceptInvite({ id });
      setValue(!value);
      refetch();
    } catch (error) {
      console.error('Erro ao aceitar o convite:', error);
    }
  };

  const handleFriendClick = (friend: any) => {
    dispatch(setUser(user));
    navigate(`/${friend._id}`);
  };

  const decline = async (id: string | undefined) => {
    if (!id) return;
    try {
      await declineInvite({ id });
      setValue(!value);
      refetch();
    } catch (error) {
      console.error('Erro ao recusar o convite:', error);
    }
  };

  return (
    <>
      <header className="relative bg-purple-500 w-full">
        <div className="flex container mx-auto justify-between items-center gap-2 p-4">
          <h1 className="text-xl text-white font-semibold">AmizApp</h1>

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
                  {searchResults.users.map((user: any) => (
                    <div
                      key={user.id}
                      className="flex items-start cursor-pointer hover:bg-purple-100 p-2"
                      onClick={() => handleFriendClick(user)}
                    >
                      <img
                        src="https://www.designi.com.br/images/preview/12040180.jpg"
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
        <aside className="absolute right-0 p-2 bg-purple-600">
          <ul>
            {data.invites.length > 0 ? (
              data.invites.map((invite) => (
                <article
                  className="text-white flex flex-col gap-2"
                  key={invite._id}
                >
                  <header className="flex flex-col items-center">
                    <p>{invite.name}</p>
                    <p className="text-xs">{invite.email}</p>
                  </header>
                  <div className="flex justify-center gap-2">
                    <button
                      className={`p-2 ${
                        value ? 'bg-orange-600' : 'bg-red-500'
                      }`}
                      onClick={() => decline(invite._id)}
                    >
                      {value ? 'Recusou convite' : 'Recusar'}
                    </button>
                    <button
                      className={`p-2 ${
                        value ? 'bg-green-600' : 'bg-purple-500'
                      }`}
                      onClick={() => accept(invite._id)}
                    >
                      {value ? 'Amizade aceita' : 'Aceitar'}
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
