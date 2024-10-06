import { signToken } from '../middleware/auth';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import PasswordResetToken from '../models/passwordReset.model';
import transport from '../middleware/sendMail';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

interface AuthServiceResponse {
  token: string;
  user: {
    name: string;
    email: string;
    id: string;
  };
}

interface verifyCodeData {
  email: string;
  code: string;
}

export const createUserService = async (data: CreateUserData) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error('Por favor preencha todos os campos.');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('Usuário já existe.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = signToken(newUser);

  return { user: newUser, token };
};

export const loginUserService = async (
  credentials: LoginUserData,
): Promise<AuthServiceResponse | null> => {
  const { email, password } = credentials;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  console.log(user);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('senha', isPasswordValid);
  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas');
  }

  const token = signToken(user);

  return {
    token,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  };
};

export const sendForgotPasswordCodeService = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Usuário não existe');
  }

  const codeValue = Math.floor(Math.random() * 1000000).toString();

  const expiresAt = new Date(Date.now() + 3600000);

  await new PasswordResetToken({
    userId: user._id,
    token: codeValue,
    expiresAt,
  }).save();

  const info = await transport.sendMail({
    from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
    to: user.email,
    subject: 'Código para recuperação de senha',
    html: `<h1>${codeValue}</h1>`,
  });

  if (info.accepted.length === 0) {
    throw new Error('Erro ao enviar o código de recuperação de senha');
  }

  return {
    success: true,
    message: 'Código de recuperação enviado com sucesso!',
  };
};

export const verifyCodeService = async (data: verifyCodeData) => {
  const { email, code } = data;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Usuario nao existe.');
  }

  const tokenRecord = await PasswordResetToken.findOne({
    userId: user._id,
    token: code,
  });

  if (!tokenRecord) {
    throw new Error('codigo expirado ou inexistente');
  }

  if (tokenRecord.expiresAt < new Date()) {
    throw new Error('Token expirado');
  }
};

export const updateUserPasswordService = async (
  email: string,
  pass: string,
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(pass, saltRounds);

  user.password = hashedPassword;
  await user.save();

  return { success: true, message: 'Senha atualizada com sucesso!' };
};
