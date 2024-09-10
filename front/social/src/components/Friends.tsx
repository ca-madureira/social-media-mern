import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchUsersQuery } from '../redux/auth/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriend } from '../redux/friend/friendSlice';
import { useAllFriendsQuery } from '../redux/friend/friendApi';

const Friends = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data = { friends: [] } } = useAllFriendsQuery();
  // Fazer a busca na API
  const {
    data: searchResults,
    error,
    isLoading,
  } = useSearchUsersQuery(
    { name: searchTerm, email: searchTerm },
    { skip: !searchTerm }, // Não faz a busca se searchTerm estiver vazio
  );

  // Dados estáticos dos amigos
  const friendsList = [
    {
      name: 'João Silva',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Maria Oliveira',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      name: 'Carlos Pereira',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      name: 'Ana Souza',
      photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
      name: 'Fernanda Lima',
      photo: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    // Adicione mais amigos se necessário
  ];
  console.log('conteudo de lista de amigos', data);
  const handleUserClick = (user: any) => {
    dispatch(setFriend(user));
    navigate(`/friend/${user._id}`);
  };

  return (
    <div className="mt-12 mr-4 border-2 w-[400px]">
      <div className="flex flex-col items-center gap-2 rounded-md p-2">
        {/* Campos de busca */}
        <div className="flex items-center gap-2 w-full mb-4">
          <input
            className="border px-2 outline-none p-2 w-3/5"
            placeholder="Pesquisar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="bg-purple-400 rounded-md p-2 text-white">
            <FaSearch />
          </button>
        </div>

        {/* Resultados da busca */}
        {isLoading && <p>Carregando...</p>}
        {error && <p>Erro ao buscar usuários</p>}
        {searchTerm &&
          searchResults?.users &&
          searchResults.users.length > 0 && (
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
        <h2 className="text-lg font-bold mb-2">Lista de Amigos:</h2>
        <div className="flex flex-wrap items-center justify-around p-2">
          {/* {friendsList.slice(0, 6).map((friend, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-24 text-center mb-4"
            >
              <img
                src={friend.photo}
                alt={friend.name}
                className="w-full rounded-md w-18 h-18"
              />
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p>{friend.name.split(' ')[0]}</p>
              </div>
            </div>
          ))} */}

          {data?.friends?.length > 0 ? (
            data.friends.map((invite) => (
              <div key={invite._id}>
                <p>Name: {invite.name}</p>
                <p>Email: {invite.email}</p>
              </div>
            ))
          ) : (
            <p>No invites available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
