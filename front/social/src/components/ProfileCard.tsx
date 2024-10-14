import { useState } from 'react';
import { useSendInviteMutation } from '../redux/friend/friendApi';

interface UserData {
  _id: string;
  name: string;
  email: string;
}

interface ProfileCardProps {
  user: UserData;
  isLoggedIn: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isLoggedIn }) => {
  const [sendInvite, { isLoading, error }] = useSendInviteMutation();
  const [msg, setMsg] = useState(false);
  console.log('VALOR DO USUARIO ISLOGGEDIN', isLoggedIn);
  const sendInviteFriend = async () => {
    console.log(user._id);
    try {
      await sendInvite({ id: user._id }).unwrap();
      console.log('Convite enviado com sucesso');
      setMsg(true);
    } catch (err) {
      console.error('Falha ao enviar o convite:', err);
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-purple-600 shadow-md space-y-2 items-center p-4 h-2/3">
      <img
        src="https://www.designi.com.br/images/preview/12040180.jpg"
        className="w-24 h-24 rounded-full border-2 border-purple-500"
        alt={`Foto de perfil de ${user.name}`}
      />
      <div className="text-center">
        <h2 className="text-lg font-semibold text-purple-600">{user.name}</h2>
        <h3 className="text-sm text-gray-500">{user.email}</h3>
      </div>
      <div className="flex justify-around w-full text-center">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">520</span>
          <span className="text-sm text-gray-500">amigos</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">234</span>
          <span className="text-sm text-gray-500">posts</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">345</span>
          <span className="text-sm text-gray-500">curtidas</span>
        </div>
      </div>
      {!isLoggedIn && (
        <button
          className={`p-2 text-white font-semibold ${
            msg ? 'bg-green-400' : 'bg-purple-500'
          }`}
          onClick={sendInviteFriend}
          disabled={isLoading}
        >
          {isLoading
            ? 'Enviando...'
            : msg
            ? 'Convite enviado'
            : 'Fazer Amizade'}
        </button>
      )}
      {error && <p>Erro ao enviar o convite: {error.toString()}</p>}
    </div>
  );
};

export default ProfileCard;
