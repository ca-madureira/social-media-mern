import { useState, useEffect } from 'react';
import social from '../assets/social-media.svg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  useLoginMutation,
  useRegisterUserMutation,
} from '../redux/auth/authApi';

import { toast } from 'react-toastify';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const [login, { isSuccess: isLoginSuccess, isError: isLoginError }] =
    useLoginMutation();
  const [
    registerUser,
    { isSuccess: isRegisterSuccess, isError: isRegisterError },
  ] = useRegisterUserMutation();
  const navigate = useNavigate();

  const submitHandler = async (data: any) => {
    const { name, email, password } = data;

    try {
      if (isLogin) {
        await login({ email, password }).unwrap();
      } else {
        await registerUser({ name, email, password }).unwrap();
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success('Login realizado com sucesso!');
      navigate('/');
    } else if (isLoginError) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
    }
  }, [isLoginSuccess, isLoginError, navigate]);

  useEffect(() => {
    if (isRegisterSuccess) {
      toast.success('Cadastro realizado com sucesso!');
      navigate('/');
    } else if (isRegisterError) {
      toast.error('Erro ao cadastrar. Verifique os dados fornecidos.');
    }
  }, [isRegisterSuccess, isRegisterError, navigate]);

  const handleToggleModal = () => {
    navigate('/forgotPass');
  };

  return (
    <main className="flex flex-col bg-purple-200 lg:flex-row order-first lg:p-16 rounded-md border-2 justify-center h-screen">
      <form
        className="flex flex-col order-last h-auto border shadow-lg bg-white border-purple-200 justify-center items-center lg:w-1/3 p-6 "
        onSubmit={handleSubmit(submitHandler)}
      >
        <header className="flex">
          <h1 className="text-2xl mb-4 font-mooli text-purple-500 font-semibold">
            {isLogin ? 'Entrar na conta' : 'Criar conta'}
          </h1>
        </header>
        <fieldset className="flex flex-col space-y-2">
          {!isLogin && (
            <input
              type="text"
              id="name"
              {...register('name', {
                minLength: {
                  value: 3,
                  message: 'Nome deve conter ao menos 3 caracteres',
                },
                required: {
                  value: true,
                  message: 'Nome é obrigatório',
                },
              })}
              placeholder="Nome"
              className={`p-2 w-full border rounded  border-purple-500 text-purple-500 font-mooli outline-none ${
                errors.name ? 'border-red-500' : 'border-[#c3cad9]'
              }`}
            />
          )}
          {errors.name?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
          )}

          <input
            className={`p-2 border rounded w-full border-purple-500 text-purple-500 font-mooli outline-none ${
              errors.email ? 'border-red-500' : 'border-[#c3cad9]'
            }`}
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
            placeholder="Email"
          />
          {errors.email?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          )}

          <input
            type="password"
            id="password"
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
            placeholder="Senha"
            className={`p-2 border rounded w-full border-purple-500 text-purple-500 font-mooli outline-none ${
              errors.password ? 'border-red-500' : 'border-[#c3cad9]'
            }`}
          />
          {errors.password?.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          )}

          {!isLogin && (
            <>
              <input
                type="password"
                id="confirmPassword"
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
                placeholder="Repita sua senha"
                className={`p-2 mt-2 border rounded w-full border-purple-500 text-purple-500 font-mooli outline-none ${
                  errors.confirmPassword ? 'border-red-500' : 'border-[#c3cad9]'
                }`}
              />

              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </>
          )}

          {isLogin && (
            <a
              href="#"
              className="font-semibold font-sm text-blue-600"
              onClick={handleToggleModal}
            >
              Esqueceu a senha?
            </a>
          )}

          <button
            type="submit"
            className="font-mooli font-semibold p-2 border border-purple-500 text-purple-500 rounded hover:bg-purple-500 hover:text-white"
            disabled={!isValid}
          >
            {isLogin ? 'Entrar' : 'Criar'}
          </button>
        </fieldset>
      </form>

      <aside className="flex order-first shadow-lg lg:order-last h-full justify-center items-center bg-purple-500 lg:w-1/3">
        <article className="flex flex-col gap-4 items-center p-8">
          {isLogin ? (
            <>
              <h2 className="text-center font-mooli font-semibold text-white">
                Não possui uma conta?
              </h2>
              <button
                onClick={() => setIsLogin(false)}
                className="p-2 border w-22 text-white border-white rounded hover:bg-white hover:text-purple-500"
              >
                Criar uma conta
              </button>
            </>
          ) : (
            <>
              <h2 className="text-center font-mooli font-semibold text-white">
                Já possui uma conta?
              </h2>
              <button
                onClick={() => setIsLogin(true)}
                className="p-2 border w-22 text-white border-white rounded hover:bg-white hover:text-purple-500"
              >
                Entrar
              </button>
            </>
          )}

          <img src={social} alt="Social Media" className=" h-auto" />
        </article>
        {/* <img src={social} alt="Social Media" className="w-1/2 h-auto" /> */}
      </aside>
    </main>
  );
};

export default Authentication;
