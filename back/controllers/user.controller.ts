import { NextFunction, Request, Response } from 'express';
import { signToken } from '../middleware/auth';
import bcrypt from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler';
import mongoose, { mongo } from 'mongoose';
import createToken from '../middleware/createToken';
import PasswordResetToken from '../models/passwordReset.model';
import {
  loginService,
  create,
  deleteUserByIdService,
} from '../services/user.service';
import User, { IUser } from '../models/user.model';
import { searchUserService } from '../services/user.service';
import Post from '../models/post.model';
import transport from '../middleware/sendMail';

// export const createUser = async (
//   req: Request,
//   res: Response,
// ): Promise<Response | void> => {
//   try {
//     // const user = await create(req.body);
//     // return res
//     //   .status(201)
//     //   .json({ message: 'Usuário registrado com sucesso', user });

//     const { name, email, password } = req.body;

//     const userExist = await User.findOne({ email });
//     if (userExist) res.status(400).send('usuario ja existe');

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newUser = new User({ name, email, password: hashedPassword });

//     await newUser.save();
//     const token = createToken(res, newUser);

//     console.log(token);

//     res.status(201).json({
//       _id: newUser._id,
//       username: newUser.name,
//       email: newUser.email,
//       token,
//     });
//   } catch (error: any) {
//     if (error.message === 'preencha os campos') {
//       return res.status(400).json({ message: error.message });
//     }
//     if (error.message === 'User already exists') {
//       return res.status(409).json({ message: error.message });
//     }
//     console.error(error);
//     return res.status(500).json({ message: 'Erro ao registrar usuário' });
//   }
// };

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Verifica se todos os campos obrigatórios estão preenchidos
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: 'Por favor preencha todos os campos.' });
  }

  // Verifica se o usuário já existe no banco de dados
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ message: 'Usuário já existe.' }); // 409 para conflito
  }

  // Gera o hash da senha
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Cria o novo usuário com a senha criptografada
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  // Tenta salvar o novo usuário no banco de dados
  try {
    await newUser.save();

    // Gera um token para o novo usuário
    const token = signToken(newUser);

    // Retorna o sucesso da operação e o token gerado
    return res.status(201).json({
      message: 'Usuário registrado com sucesso',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token,
      },
    });
  } catch (error: any) {
    // Trata possíveis erros na operação de salvar o usuário
    console.error('Erro ao registrar usuário:', error.message);
    return res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

export const loginController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'E-mail e senha são obrigatórios' });
    }

    const authResponse = await loginService({ email, password });

    return res.status(200).json(authResponse);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};

// export const deleteUserController = async (req: Request, res: Response) => {
//   const userId = req.params.id;

//   // if (req.user?._id === userId) {
//   try {
//     // Converta userId para ObjectId
//     // const objectId = new mongoose.Types.ObjectId(userId);
//     await User.findByIdAndDelete(req.params.id);
//     // await deleteUserService(objectId);
//     return res.status(200).json({
//       success: true,
//       message: 'Account has been deleted successfully',
//     });
//   } catch (err: any) {
//     console.error(err);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: err.message,
//     });
//   }
//   // } else {
//   //   return res.status(403).json({
//   //     success: false,
//   //     message: 'You can only delete your own account',
//   //   });
//   // }
// };

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtém o 'id' da URL

    // Verifica se o usuário autenticado é o mesmo que está tentando deletar a conta
    //   const userId = req.user?._id.toString();
    // console.log('User ID from request:', req.user?._id.toHexString());
    console.log('ID from URL params:', id);

    // if (userId !== id) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Você só pode deletar sua própria conta',
    //   });
    // }

    await deleteUserByIdService(id);

    return res
      .status(200)
      .json({ success: true, message: 'Usuário deletado com sucesso' });
  } catch (error: any) {
    console.error('Erro ao deletar usuário:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao deletar usuário',
      error: error.message,
    });
  }
};

export const searchUser = async (req: Request, res: Response) => {
  try {
    // Convert query parameters to strings or provide default empty strings
    const name = (req.query.name as string) || '';
    const email = (req.query.email as string) || '';

    // Await the result from searchUserService
    const users = await searchUserService({ name, email });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

export const sendInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // ID do usuário logado
    const friendId = req.params.id; // ID do usuário que receberá o convite

    if (!userId) {
      return res.status(400).json({ message: 'Usuário não autenticado' });
    }

    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(400).json({ message: 'ID de usuário inválido' });
    }

    // Adiciona o ID do usuário logado à lista de convites do usuário amigo
    const friend = await User.findByIdAndUpdate(
      friendId,
      { $addToSet: { invites: userId } }, // $addToSet evita duplicados
      { new: true }, // Retorna o documento atualizado
    );

    if (!friend) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Convite enviado com sucesso', friend });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar o convite' });
  }
};

export const allInvites = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // ID do usuário logado

    if (!userId) {
      return res.status(400).json({ message: 'Usuário não autenticado' });
    }

    const user = await User.findById(userId).populate({
      path: 'invites', // Popula o campo 'invites'
      select: 'name email', // Seleciona apenas 'name' e 'email' dos usuários que enviaram convites
    });

    console.log('usuario logado com os convites', user?.invites);
    const invites = user?.invites;

    console.log(invites);

    // Retorna os convites
    res.status(200).json({
      invites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao recuperar convites' });
  }
};

export const acceptInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // ID do usuário logado
    const inviterId = req.params.id; // ID do usuário que enviou o convite

    if (!userId) {
      return res.status(400).json({ message: 'Usuário não autenticado' });
    }

    if (!mongoose.Types.ObjectId.isValid(inviterId)) {
      return res.status(400).json({ message: 'ID de usuário inválido' });
    }

    // Verificar se o convite existe
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se o ID do usuário que enviou o convite está na lista de convites
    //ver se tem outra forma
    // if (!user.invites.includes(inviterId)) {
    //   return res.status(400).json({ message: 'Convite não encontrado' });
    // }

    // Remove o ID do usuário que enviou o convite da lista de convites
    // e adiciona o ID à lista de amigos

    //alterar usando o mongoose
    user.invites = user.invites.filter(
      (inviteId) => inviteId.toString() !== inviterId,
    );
    user.friends.push(new mongoose.Types.ObjectId(inviterId));

    await user.save();

    // Também adicionar o usuário logado à lista de amigos do usuário que enviou o convite
    await User.findByIdAndUpdate(inviterId, {
      $addToSet: { friends: userId },
    });

    res.status(200).json({ message: 'Convite aceito com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao aceitar o convite' });
  }
};

export const allFriends = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // ID do usuário logado

    if (!userId) {
      return res.status(400).json({ message: 'Usuário não autenticado' });
    }

    const user = await User.findById(userId).populate({
      path: 'friends', // Popula o campo 'invites'
      select: 'name email', // Seleciona apenas 'name' e 'email' dos usuários que enviaram convites
    });

    const friends = user?.friends;

    console.log(friends);

    // Retorna os convites
    res.status(200).json({
      friends,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao recuperar convites' });
  }
};

export const getFriendPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // ID do usuário logado

    // Buscar o usuário logado com a lista de amigos
    const user = await User.findById(userId).populate('friends', 'name email');

    if (!user) {
      return res.status(404).json({
        error_code: 'USER_NOT_FOUND',
        error_description: 'Usuário não encontrado',
      });
    }
    const friendIds = user.friends.map((friend) => friend._id); // Extrai os IDs dos amigos

    // Buscar os posts dos amigos
    const friendPosts = await Post.find({ author: { $in: friendIds } })
      .populate('author', 'name email') // Para pegar o nome e avatar dos autores (amigos)
      .sort({ createdAt: -1 }); // Ordenar pelos mais recentes
    console.log('amigos sao: ', user);
    console.log('posts dos amigos', user.friends);
    res.status(200).json(friendPosts);
  } catch (error) {
    res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'Erro ao buscar os posts dos amigos',
    });
  }
};

export const sendForgotPasswordCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Verifica se o usuário existe no banco de dados
    const exist = await User.findOne({ email });

    if (!exist) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não existe',
      });
    }

    // Gera um código de 6 dígitos para a recuperação de senha
    const codeValue = Math.floor(Math.random() * 1000000).toString();

    // Define a data de expiração para 1 hora a partir de agora
    const expiresAt = new Date(Date.now() + 3600000); // 1 hora de expiração

    // Cria e salva o token de recuperação de senha no banco de dados
    await new PasswordResetToken({
      userId: exist._id,
      token: codeValue,
      expiresAt, // Define a data de expiração
    }).save();

    // Envia o código por email usando o transport configurado
    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS, // Endereço de envio
      to: exist.email, // Email do destinatário
      subject: 'Código para recuperação de senha', // Assunto do email
      html: `<h1>${codeValue}</h1>`, // Corpo do email com o código
    });

    // Verifica se o email foi enviado com sucesso
    if (info.accepted.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Código de recuperação enviado com sucesso!',
      });
    }

    // Se o email não foi enviado, retorna erro
    return res.status(500).json({
      success: false,
      message: 'Falha ao enviar o código de recuperação',
    });
  } catch (err: any) {
    console.error('Erro ao enviar código de recuperação:', err);
    return res.status(500).json({
      success: false,
      message: 'Erro no servidor. Tente novamente mais tarde.',
    });
  }
};

export const verifyCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  console.log('email', email);
  console.log('code', code);
  try {
    // 1. Procure o usuário pelo email para obter o userId
    const user = await User.findOne({ email });

    // Se o usuário não existir, retorne erro
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    // 2. Agora procure o token de recuperação de senha usando o userId
    const tokenRecord = await PasswordResetToken.findOne({
      userId: user._id,
      token: code, // Comparando o código fornecido
    });

    // Se o código não for encontrado ou for inválido, retorne erro
    if (!tokenRecord) {
      return res.status(400).json({
        success: false,
        message: 'Código inválido ou expirado',
      });
    }

    // 3. Verifique se o código já expirou
    if (tokenRecord.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Código expirado',
      });
    }

    // 4. Se o código for válido e não expirado, prossiga com a redefinição de senha
    return res.status(200).json({
      success: true,
      message: 'Código verificado com sucesso',
    });

    // Opcional: Apague o token após o uso
    // await tokenRecord.deleteOne();
  } catch (err: any) {
    console.error('Erro ao verificar o código:', err);
    return res.status(500).json({
      success: false,
      message: 'Erro no servidor. Tente novamente mais tarde.',
    });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const { email, pass } = req.body;

  console.log('email', email);
  console.log('pass', pass);

  try {
    // 1. Verifique se o usuário existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    // 2. Gere o hash da nova senha
    const saltRounds = 10; // Define a complexidade do salt para o bcrypt
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    // 3. Atualize a senha do usuário no banco de dados
    user.password = hashedPassword;
    await user.save();

    // 4. Retorne uma resposta de sucesso
    return res.status(200).json({
      success: true,
      message: 'Senha atualizada com sucesso!',
    });
  } catch (err: any) {
    // Caso ocorra algum erro, logue no servidor e retorne erro
    console.error('Erro ao atualizar a senha:', err);
    return res.status(500).json({
      success: false,
      message: 'Erro no servidor. Tente novamente mais tarde.',
    });
  }
};
