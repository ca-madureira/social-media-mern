import React, { useState } from 'react';
import {
  useSendForgotPasswordCodeMutation,
  useUpdatePassMutation,
  useVerifyCodeMutation,
} from '../redux/auth/authApi';
import { useUpdateAvatarMutation } from '../redux/profile/profileApi';
import { Navigate, useNavigate } from 'react-router-dom';

const ModalPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(''); // Estado para armazenar o código
  const [pass, setPass] = useState('');
  const [openCode, setOpenCode] = useState(false); // Controle para exibir o campo de código
  const [sendForgotPasswordCode] = useSendForgotPasswordCodeMutation();
  const [updatePass] = useUpdatePassMutation();
  const [verifyCode] = useVerifyCodeMutation();
  const [openPass, setOpenPass] = useState(false);

  const navigate = useNavigate();
  // Função para manipular o envio do email
  const handleEmailSubmit = async () => {
    console.log('Email enviado:', email);
    await sendForgotPasswordCode({ email }).unwrap();
    setOpenCode(true); // Após envio do e-mail, exibe o campo de código
  };

  // Função para manipular o envio do código (adicione sua lógica)
  const handleCodeSubmit = async () => {
    console.log('Código enviado:', code);
    await verifyCode({ email, code });
    setOpenPass(true);
  };

  // Função para atualizar o estado do email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Função para atualizar o estado do código
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleUpdatePassword = async () => {
    await updatePass({ email, pass });
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center fixed top-0 left-0 bg-slate-300 z-40 w-full h-full">
      <div className="border w-[650px] p-2 rounded-md bg-white relative">
        <div className="flex flex-col items-center justify-between relative bg-purple-400 p-4 rounded-md">
          <div>
            {/* Input para email */}
            <input
              type="email"
              onChange={handleEmailChange}
              value={email}
              placeholder="Digite seu email"
              className="p-2 rounded border"
            />
            {/* Botão para enviar email */}
            <button
              className="bg-slate-600 text-white p-2 rounded ml-4"
              onClick={handleEmailSubmit}
            >
              Enviar email
            </button>
          </div>
          {openCode && (
            <div className="mt-4">
              {/* Input para código */}
              <input
                type="text"
                onChange={handleCodeChange}
                value={code}
                placeholder="Digite o código recebido"
                className="p-2 rounded border"
              />
              {/* Botão para enviar o código */}
              <button
                className="bg-slate-600 text-white p-2 rounded ml-4"
                onClick={handleCodeSubmit}
              >
                Enviar código
              </button>
            </div>
          )}

          {openPass && (
            <>
              <input
                type="text"
                onChange={(e) => setPass(e.target.value)} // Atualiza o estado do pass com o valor do input
                value={pass}
                placeholder="Digite o código recebido"
                className="p-2 rounded border"
              />
              <button
                className="bg-purple-700 text-white p-2 rounded" // Adicionando estilo e texto ao botão
                onClick={handleUpdatePassword} // Chama a função para atualizar a senha
              >
                Atualizar senha
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPassword;
