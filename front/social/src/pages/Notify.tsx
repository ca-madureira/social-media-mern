import React, { useState } from 'react';
import {
  useAcceptInviteMutation,
  useAllInvitesQuery,
} from '../redux/friend/friendApi';

const Notify = () => {
  const [value, setValue] = useState(false);
  const { data = { invites: [] } } = useAllInvitesQuery();
  const [acceptInvite] = useAcceptInviteMutation();

  const accept = async (id: string | undefined) => {
    if (!id) {
      console.error('Convite sem ID!');
      return; // Garante que você só chama acceptInvite com um id válido
    }

    try {
      await acceptInvite({ id });
      setValue(!value);
    } catch (error) {
      console.error('Erro ao aceitar o convite:', error);
    }
  };

  return (
    <div>
      {data.invites.length > 0 ? (
        data.invites.map((invite) => (
          <div key={invite._id}>
            <p>Name: {invite.name}</p>
            <p>Email: {invite.email}</p>
            <button
              className={`cursor-pointer p-2 ${
                value ? 'bg-green-600' : 'bg-purple-600'
              }`}
              onClick={() => accept(invite._id)} // Agora aceitamos que invite._id pode ser undefined
            >
              {value ? 'Amizade aceita' : 'Aceitar amizade'}
            </button>
          </div>
        ))
      ) : (
        <p>No invites available.</p>
      )}
    </div>
  );
};

export default Notify;
