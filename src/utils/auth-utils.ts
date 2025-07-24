import { IUser } from '../interfaces/users';
require('dotenv').config();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { JWT_SECRET } = process.env;
const EXPIRES_IN = '7d';
/** Cria o token com as infos do usuário (id, username, roles, is_company, active) */
const createToken = async (user: IUser) => {
  const token = await jwt.sign({ _id: user?.id, username: user?.username, roles: user?.roles, is_company: user?.is_company, active: user?.active }, JWT_SECRET!, {
    expiresIn: EXPIRES_IN,
  });
  return token;
};

/** Valida se a senha enviada corrensponde a salva na tabela */
const passwordValidator = async (client_password: string, hashed_password: string) => {
  const resolve = await bcrypt.compare(client_password, hashed_password);
  return resolve;
};

/** Verifica se é um token válido*/
const verifyToken = (token: string) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string, {
      issuer: 'jwt-auth-app',
      audience: 'jwt-auth-users',
    });
    return decode;
  } catch (error) {
    throw { error };
  }
};

/** Retorna o token clarificado */
const extractTokenFromHeader = (auth: string | undefined) => {
  if (!auth) {
    return null;
  }

  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
};

/** Contem funções para auxiliar no tratamento de usuárioe token  */
const UAuth = {
  createToken,
  passwordValidator,
  verifyToken,
  extractTokenFromHeader,
};

export default UAuth;
