import { FaCircle } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
const Friends = () => {
  const friends = [
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
  ];

  return (
    <div className="mt-12 mr-4 border-2 w-[400px]">
      <div className="flex items-center justify-center gap-2  rounded-md p-2">
        <input
          className="border px-2 outline-none p-2 w-4/5"
          placeholder="Pesquisar amigos..."
        />
        <button className="bg-purple-400 rounded-md p-2 text-white">
          <FaSearch />
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-around p-2  ">
        {friends.slice(0, 6).map((friend) => (
          <div className="flex flex-col items-center w-24 text-center">
            <img
              src={friend.photo}
              alt={friend.name}
              className="w-full rounded-md w-18 h-18"
            />

            <div className="flex items-center  gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="">{friend.name.split(' ')[0]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
