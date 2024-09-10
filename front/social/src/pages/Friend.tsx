// src/pages/Friend.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useSendInviteMutation } from '../redux/friend/friendApi';

const Friend = () => {
  const { id } = useParams<{ id: string }>(); // Obter o ID da URL
  const friend = useSelector((state: RootState) => state.friend); // Selecionar o estado do amigo

  const [sendInvite, { isLoading, error }] = useSendInviteMutation(); // Usar mutação para enviar o convite
  const [msg, setMsg] = useState(false);

  if (!friend) {
    return <div>Amigo não encontrado</div>;
  }

  const sendInviteFriend = async () => {
    try {
      await sendInvite({ id: friend._id }).unwrap(); // Chamar a mutação com o ID do amigo
      console.log('Convite enviado com sucesso');
      setMsg(true); // Definir msg como true quando o convite é enviado com sucesso
    } catch (err) {
      console.error('Falha ao enviar o convite:', err);
    }
  };

  return (
    <div>
      <h1>Perfil de {friend.name}</h1>
      <p>Email: {friend.email}</p>
      {/* Adicione mais informações do amigo aqui */}
      <button
        className={`p-2 ${msg ? 'bg-green-200' : 'bg-purple-500'}`}
        onClick={sendInviteFriend}
        disabled={isLoading}
      >
        {isLoading ? 'Enviando...' : msg ? 'Convite enviado' : 'Fazer Amizade'}
      </button>
      {error && <p>Erro ao enviar o convite: {error.toString()}</p>}
    </div>
  );
};

export default Friend;
