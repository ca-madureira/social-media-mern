import { useState, FC } from 'react';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa6';
import { IoSettingsSharp } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { useDeleteAccountMutation } from '../redux/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { userLoggedOut } from '../redux/auth/authSlice';
import ModalConfirm from './ModalConfirm';
import { RootState } from '../redux/store';
import { setUser } from '../redux/friend/userSlice';
import { FaHome } from 'react-icons/fa';
import {
  useAllInvitesQuery,
  useAcceptInviteMutation,
  useDeclineInviteMutation,
} from '../redux/friend/friendApi';
import { FaUserFriends } from 'react-icons/fa';
import { VscRepoFetch } from 'react-icons/vsc';
const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);
  const [openInvites, setOpenInvites] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false); // Estado do modal de confirmação
  const [acceptInvite] = useAcceptInviteMutation();
  const [declineInvite] = useDeclineInviteMutation();
  const [deleteAccount] = useDeleteAccountMutation();
  const auth = useSelector((state: RootState) => state.auth.user.id);
  const userHome = useSelector((state: RootState) => state.user);
  const [value, setValue] = useState(false);
  const { data = { invites: [] }, refetch } = useAllInvitesQuery({ auth });
  const deleteUser = async () => {
    await deleteAccount(user.id);
    navigate('/login');
  };

  const logout = () => {
    dispatch(userLoggedOut());
    navigate('/login');
  };
  const handleHome = () => {
    // Use o dispatch corretamente com a action setUser
    dispatch(
      setUser({
        _id: user.id, // Certifique-se de que o campo user.id está correto
        name: user.name,
        email: user.email,
        friends: user.friends,
      }),
    );

    navigate('/');
  };

  const accept = async (id: string | undefined) => {
    if (!id) {
      console.error('Convite sem ID!');
      return; // Garante que você só chama acceptInvite com um id válido
    }

    try {
      await acceptInvite({ id });
      setValue(!value);
      refetch();
    } catch (error) {
      console.error('Erro ao aceitar o convite:', error);
    }
  };

  const decline = async (id: string | undefined) => {
    if (!id) {
      console.error('Convite sem ID!');
      return; // Garante que você só chama acceptInvite com um id válido
    }

    try {
      await declineInvite({ id });
      setValue(!value);
      refetch();
    } catch (error) {
      console.error('Erro ao aceitar o convite:', error);
    }
  };

  return (
    <>
      <header className="relative bg-purple-500 w-full">
        <div className="flex container mx-auto justify-between items-center gap-2 p-4">
          <div className="text-xl text-white font-semibold">AmizApp</div>
          <div className="flex ">
            {' '}
            <div
              className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded-md cursor-pointer"
              onClick={handleHome}
            >
              <FaHome className="text-white font-semibold w-6 h-6" />
            </div>
            <div className=" relative flex items-center gap-2 hover:bg-purple-700 p-2 rounded-md cursor-pointer">
              {data.invites.length > 0 ? (
                <div className="absolute top-0 right-0 bg-purple-800 w-4 h-4 rounded-full text-xs text-center text-white ">
                  {data.invites.length}
                </div>
              ) : (
                ''
              )}

              <FaUserFriends
                className="text-white font-semibold w-6 h-6"
                onClick={() => setOpenInvites(!openInvites)}
              />
            </div>
            <div className="flex items-center gap-2 hover:bg-purple-700 p-2 rounded-md">
              <IoSettingsSharp
                className=" text-white font-semibold w-6 h-6 cursor-pointer"
                onClick={() => setOpenMenu(!openMenu)}
              />
            </div>
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
              onClick={() => setOpenModalConfirm(true)} // Abre o modal de confirmação
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
                      {value ? 'recusou convite' : 'recusar'}
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
