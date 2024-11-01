import React, { useState } from 'react';
import { useSendInviteMutation } from '../redux/user/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { RiEmotionHappyFill } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';
import { useUpdateAvatarMutation } from '../redux/profile/profileApi';

interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  invites: object[];
  friends: object[];
}

interface ProfileCardProps {
  user: UserData;
  isLoggedIn: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isLoggedIn }) => {
  const [sendInvite, { isLoading, error }] = useSendInviteMutation();
  const [msg, setMsg] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const [updateAvatar] = useUpdateAvatarMutation();

  const isInvite = user?.invites?.some(
    (invite: any) => invite.email === auth?.email,
  );
  const isFriend = user?.friends?.some(
    (friend: any) => friend.email === auth?.email,
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result;
      if (typeof base64data === 'string') {
        await uploadAvatar(base64data);
      }
    };
  };

  const uploadAvatar = async (base64data: string) => {
    try {
      await updateAvatar({ avatar: base64data }).unwrap();
    } catch (error) {
      console.error('Erro ao atualizar a imagem de perfil', error);
    }
  };

  const sendInviteFriend = async () => {
    try {
      await sendInvite({ id: user._id }).unwrap();
      setMsg(true);
    } catch (err) {
      console.error('Falha ao enviar o convite:', err);
    }
  };

  return (
    <aside className="h-2/5 flex flex-col bg-white shadow-purple-600 shadow-md space-y-6 items-center p-4">
      <div className="relative group">
        <img
          src={
            user?.avatar ||
            'https://www.designi.com.br/images/preview/12040180.jpg'
          }
          className="w-24 h-24 rounded-md border-2 border-purple-200 cursor-pointer"
          alt={`Foto de perfil de ${user?.name}`}
        />
        {isLoggedIn && (
          <label
            htmlFor="avatar-upload"
            className="absolute flex inset-0 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-md cursor-pointer"
          >
            <AiOutlineEdit className="w-6 h-6 text-purple-300" />
          </label>
        )}
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <header className="text-center">
        <h2 className="text-lg font-semibold font-mooli text-purple-600">
          {user?.name}
        </h2>
        <p className="text-xs text-gray-500 font-mooli">{user?.email}</p>
      </header>

      {!isLoggedIn && (
        <>
          {isFriend ? (
            <p className="bg-purple-100 text-purple-500 font-semibold w-full flex justify-center items-center border-2 border-l-purple-400 border-r-purple-400 border-t-purple-200 border-b-purple-200 p-2 gap-2">
              <RiEmotionHappyFill className="text-purple-500 w-6 h-6" /> Amigos
            </p>
          ) : isInvite ? (
            <p className="bg-purple-400 text-white font-semibold px-2 rounded-md uppercase">
              Convite enviado
            </p>
          ) : (
            <button
              className={`p-2 text-white font-semibold ${
                msg ? 'bg-green-400' : 'bg-purple-500'
              }`}
              onClick={sendInviteFriend}
              disabled={isLoading}
            >
              {isLoading ? 'Enviando...' : msg ? 'Enviado' : 'Fazer Amizade'}
            </button>
          )}
        </>
      )}

      {error && <p>Erro ao enviar o convite: {error.toString()}</p>}
    </aside>
  );
};

export default ProfileCard;
