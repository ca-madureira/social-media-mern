import React, { useState } from "react";
import {
  useSendInviteMutation,
  useUnfriendMutation,
} from "../redux/user/userApi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../redux/store";
import { AiOutlineEdit } from "react-icons/ai";
import { useUpdateAvatarMutation } from "../redux/profile/profileApi";
import { UserProfile, ProfileCardProps } from "../interfaces";

const ProfileCard: React.FC<ProfileCardProps> = ({ user, isLoggedIn, refetchUser }) => { // Receba refetchUser
  const [sendInvite, { isLoading, error }] = useSendInviteMutation();
  const [msg, setMsg] = useState(false);
  const [isUnFriend, setIsUnfriend] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const [updateAvatar] = useUpdateAvatarMutation();
  const [unfriend] = useUnfriendMutation();
  const { id } = useParams();

  const isInvite = user?.invites?.some((invite: UserProfile) => invite.email === auth?.email);
  const isFriend = user?.friends?.some((friend: UserProfile) => friend.email === auth?.email);

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
      if (typeof base64data === "string") {
        await uploadAvatar(base64data);
      }
    };
  };

  const uploadAvatar = async (base64data: string) => {
    try {
      await updateAvatar({ avatar: base64data }).unwrap();
    } catch (error) {
      console.error("Erro ao atualizar a imagem de perfil", error);
    }
  };

  const sendInviteFriend = async () => {
    try {
      await sendInvite({ id: user._id }).unwrap();
      setMsg(true);
    } catch (err) {
      console.error("Falha ao enviar o convite:", err);
    }
    console.log(user);
  };

  const handleUnfriend = async () => {
    try {
      console.log('Estou deixando de ser seu amigo', user._id);
      setIsUnfriend(true);
      await unfriend({ id: user._id }).unwrap();
      refetchUser(); // Chame refetch aqui
      console.log(isUnFriend);
    } catch (err) {
      console.error("Erro ao desfazer amizade:", err);
    }
    console.log(isUnFriend);
  };

  return (
    <aside className="min-w-[150px] h-2/5 flex flex-col border-2 border-purple-300 bg-white shadow-purple-600 shadow-md space-y-6 items-center p-4 mt-2">
      <div className="relative group">
        <img
          src={
            user?.avatar ||
            "https://cdn-icons-png.flaticon.com/512/6188/6188625.png"
          }
          className="w-24 h-26 rounded-md border-2 border-purple-200 cursor-pointer"
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
        <h2 className="text-xl font-semibold font-mooli text-purple-500">
          {user?.name}
        </h2>
        {
          auth.id === id && (
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-lime-500 rounded-full"></div><span className="text-xs text-gray-500 font-mooli">online</span>
            </div>
          )
        }
      </header>

      {!isLoggedIn && (
        <>
          {isFriend && !isUnFriend ? (
            <button
              className="bg-violet-300 p-2 text-white font-medium"
              onClick={handleUnfriend}
            >
              Desfazer Amizade
            </button>
          ) : isInvite ? (
            <p className="bg-purple-400 text-white font-semibold px-2 rounded-md uppercase py-2">
              Convite enviado
            </p>
          ) : (
            <button
              className={`p-2 text-white font-semibold ${msg ? "bg-green-400" : "bg-purple-500"
                }`}
              onClick={sendInviteFriend}
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : msg ? "Enviado" : "Fazer Amizade"}
            </button>
          )}
        </>
      )}

      {error && <p>Erro ao enviar o convite: {error.toString()}</p>}
    </aside>
  );
};

export default ProfileCard;