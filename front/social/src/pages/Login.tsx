import { useState } from 'react';
import social from '../assets/social-media.svg';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../redux/auth/authApi';
import LoginLayout from '../components/LoginLayout';

interface FormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  );
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const [login] = useLoginMutation();
  const [registerUser] = useRegisterMutation();

  const navigate = useNavigate();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      // setSelectedImage(file);
    }
  };

  const submitHandler = async (data: FormData) => {
    const { name, email, password } = data;

    try {
      if (isLogin) {
        await login({ email, password }).unwrap();
        navigate('/');
      } else {
        await registerUser({
          name: name!,
          email,
          password,
          // avatar: selectedImage,
        }).unwrap();
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
    }
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

          {!isLogin ? (
            <>
              <div className="relative flex justify-center mb-4">
                <img
                  src={profileImage || social} // Use a imagem padrão se não houver imagem selecionada
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-2 border-purple-900"
                />
                <input
                  className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
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
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name?.message}
                </p>
              )}
            </>
          ) : (
            <img src={social} className="w-46 h-36" alt="Social Media" />
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
                      if (value !== password) {
                        return 'Senhas não coincidem';
                      }
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
              >
                {' '}
                Esqueceu a senha?
              </a>
            )}
          </div>

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
                <div className="w-full font-mooli">
                  <h1>Bem-vindo(a)!</h1>
                  <p>
                    Entre em sua conta e veja o que as pessoas estão falando{' '}
                  </p>
                </div>
              ) : (
                <div className="w-full font-mooli">
                  <h1>Olá!</h1>
                  <p>Faça e encontre amigos no mundo todo</p>
                </div>
              )}
              <button
                className="font-mooli font-semibold border border-white text-white p-2 rounded w-full hover:bg-white hover:text-purple-900"
                onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
              >
                {isLogin ? 'Criar' : 'Entrar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Login;
