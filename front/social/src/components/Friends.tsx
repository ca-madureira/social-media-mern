import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchUsersQuery } from '../redux/auth/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/friend/userSlice';
// import { setFriend } from '../redux/friend/friendSlice';

const Friends = ({ user }: any) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fazer a busca na API
  const {
    data: searchResults,
    error,
    isLoading,
  } = useSearchUsersQuery(
    { name: searchTerm, email: searchTerm },
    { skip: !searchTerm }, // Não faz a busca se searchTerm estiver vazio
  );

  const handleUserClick = (user: any) => {
    dispatch(setUser(user));
    navigate(`/friend/${user._id}`);
  };

  return (
    <div className="p-2 w-3/5 shadow-purple-600 shadow-md  bg-white">
      <div className="flex justify-center">
        <input
          className="px-2 outline-none p-2  bg-purple-300 w-3/5 placeholder-white"
          placeholder="Pesquisar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="bg-purple-700 rounded-md p-2 text-white">
          <FaSearch />
        </button>
      </div>

      {/* Resultados da busca */}
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao buscar usuários</p>}
      {searchTerm && searchResults?.users && searchResults.users.length > 0 && (
        <div className="flex flex-col items-center w-full p-2 mb-4">
          <h2 className="text-lg font-bold mb-2">Resultados da Busca:</h2>
          {searchResults.users.map((user: any) => (
            <div
              key={user.id}
              className="flex flex-col items-center w-full mb-4 cursor-pointer"
              onClick={() => handleUserClick(user)}
            >
              <p className="font-semibold">{user.name}</p>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      )}

      {/* Lista de amigos */}
      <h2 className="text-lg font-bold mb-2 font-mooli text-purple-700">
        Amigos
      </h2>

      {user?.friends?.length > 0 ? (
        user.friends.map((friend: any) => (
          <div
            key={friend._id}
            className="bg-purple-300 flex flex-col items-center p-2 cursor-pointer w-24 flex-wrap"
          >
            <img
              className="w-20 h-20 rounded-md"
              src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            />
            <p className="text-purple-600 font-semibold">{friend.name}</p>
          </div>
        ))
      ) : (
        <p>Não há amigos</p>
      )}
    </div>
  );
};

export default Friends;
