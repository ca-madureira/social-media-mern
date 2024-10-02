import { useState } from 'react';
import social from '../assets/social-media.svg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  useLoginMutation,
  useRegisterUserMutation,
} from '../redux/auth/authApi';
import LoginLayout from '../components/LoginLayout';
import ModalPassword from '../components/ModalPassword';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);

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

  const [login] = useLoginMutation();
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const submitHandler = async (data: any) => {
    const { name, email, password } = data;

    try {
      if (isLogin) {
        // Caso de login
        const response = await login({ email, password }).unwrap();
        console.log('retorno do response', response);
        const token = response.token;
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        console.log({ name, email, password });
        const response = await registerUser({ name, email, password }).unwrap();

        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
    }
  };

  const handleToggleModal = () => {
    navigate('/forgotPass');
  };

  return (
    <LoginLayout>
      <div className="flex gap-4 border rounded-lg shadow-lg bg-white justify-center max-w-max p-6 h-[550px]">
        <form
          className="flex flex-col space-y-2 p-6"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl mb-4 font-mooli text-purple-900 font-semibold">
              {isLogin ? 'Entrar na conta' : 'Criar conta'}
            </h1>
          </div>

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
              className={`p-2 border rounded w-60 border-purple-900 text-purple-900 font-mooli outline-none ${
                errors.name ? 'border-red-500' : 'border-[#c3cad9]'
              }`}
            />
          )}
          {errors.name?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
          )}

          <input
            className={`p-2 border rounded w-60 border-purple-900 text-purple-900 font-mooli outline-none ${
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

          <div className="flex flex-col items-start">
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
              className={`p-2 border rounded w-60 border-purple-900 text-purple-900 font-mooli outline-none ${
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
                  className={`p-2 border rounded w-60 border-purple-900 text-purple-900 font-mooli outline-none ${
                    errors.confirmPassword
                      ? 'border-red-500'
                      : 'border-[#c3cad9]'
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
                className="font-semibold font-sm text-blue-600 underline"
                onClick={handleToggleModal}
              >
                Esqueceu a senha?
              </a>
            )}
          </div>
          {openModal && <ModalPassword />}
          <button
            type="submit"
            className="font-mooli font-semibold p-2 border border-purple-900 text-purple-900 rounded hover:bg-purple-900 hover:text-white"
          >
            {isLogin ? 'Entrar' : 'Criar'}
          </button>
        </form>

        <div className="flex justify-center items-center">
          <div className="flex items-center rounded-b-2xl rounded-t-2xl w-full h-full bg-purple-900 text-white">
            <div className="flex flex-col gap-4 items-center w-[350px] p-8">
              {isLogin ? (
                <>
                  <p className="text-center font-mooli font-semibold">
                    Não possui uma conta?
                  </p>
                  <button
                    onClick={() => setIsLogin(false)}
                    className="p-2 border border-white rounded hover:bg-white hover:text-purple-900"
                  >
                    Criar uma conta
                  </button>
                </>
              ) : (
                <>
                  <p className="text-center font-mooli font-semibold">
                    Já possui uma conta?
                  </p>
                  <button
                    onClick={() => setIsLogin(true)}
                    className="p-2 border border-white rounded hover:bg-white hover:text-purple-900"
                  >
                    Entrar
                  </button>
                </>
              )}
            </div>
            <img src={social} alt="Social Media" className="w-1/2 h-auto" />
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Login;
