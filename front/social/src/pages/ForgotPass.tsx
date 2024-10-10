import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useSendForgotPasswordCodeMutation,
  useUpdatePassMutation,
  useVerifyCodeMutation,
} from '../redux/auth/authApi';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [verifyCode] = useVerifyCodeMutation();
  const [sendForgotPasswordCode, { isLoading }] =
    useSendForgotPasswordCodeMutation();
  const [updatePass] = useUpdatePassMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const handleSendEmail = async (data: any) => {
    await sendForgotPasswordCode({ email: data.email }).unwrap();
    setStep(2);
  };

  const handleSendCode = async (data: any) => {
    const email = getValues('email');
    await verifyCode({ email, code: data.code }).unwrap();
    setStep(3);
  };

  const handleSavePass = async (data: any) => {
    const email = getValues('email');
    await updatePass({ email, pass: data.password }).unwrap();
    navigate('/login');
  };

  const handleSend = (data: any) => {
    if (step === 1) {
      handleSendEmail(data);
    } else if (step === 2) {
      handleSendCode(data);
    } else if (step === 3) {
      handleSavePass(data);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-purple-500 font-mooli font-bold text-2xl ml-6">
        {step === 1 && 'Enviar email'}
        {step === 2 && 'Enviar código'}
        {step === 3 && 'Alterar senha'}
      </h1>
      <section>
        <form className="flex" onSubmit={handleSubmit(handleSend)}>
          {step === 1 && (
            <section className="flex flex-col gap-2">
              <input
                className="p-2 text-center font-mooli outline-none"
                type="email"
                id="email"
                {...register('email', {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Insira um email válido',
                  },
                  required: {
                    value: true,
                    message: 'Email é obrigatório',
                  },
                })}
                placeholder="Digite seu e-mail"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
              <button
                className="bg-purple-500 text-white font-semibold p-2"
                type="submit"
              >
                {isLoading ? 'Enviando...' : 'Enviar e-mail'}
              </button>
            </section>
          )}

          {step === 2 && (
            <section className="flex flex-col gap-2">
              <input
                className="p-2 text-center font-mooli outline-none"
                type="text"
                {...register('code', {
                  required: {
                    value: true,
                    message: 'Código é obrigatório',
                  },
                })}
                placeholder="Digite o código"
              />
              <button
                className="bg-purple-500 text-white font-semibold p-2"
                type="submit"
              >
                Enviar código
              </button>
            </section>
          )}

          {step === 3 && (
            <section className="flex flex-col p-2 gap-2">
              <input
                className="p-2 text-center font-mooli outline-none"
                type="password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Senha é obrigatória',
                  },
                  minLength: {
                    value: 6,
                    message: 'Senha deve conter ao menos 6 caracteres',
                  },
                })}
                placeholder="Nova senha"
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}

              <input
                className="p-2 text-center font-mooli outline-none"
                type="password"
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: 'Confirmação de senha é obrigatória',
                  },
                  validate: (value) => {
                    const password = getValues('password');
                    return value === password || 'Senhas não coincidem';
                  },
                })}
                placeholder="Confirme a nova senha"
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
              <button
                className="bg-purple-500 text-white font-semibold p-2 text-center"
                type="submit"
              >
                Salvar senha
              </button>
            </section>
          )}
        </form>
      </section>
    </main>
  );
};

export default ForgotPass;
