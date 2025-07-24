import { IUser } from '../interfaces/users';
import * as validator from 'validator';
import { cnpj, cpf, validator as cnpjfValidator } from 'cpf-cnpj-validator';
import UsersModel from '../models/UsersModel';
import bcrypt from 'bcrypt';
import UAuth from '../utils/auth-utils';
import { Op } from 'sequelize';

const SALT = 7;

const register = async (user: Pick<IUser, 'name' | 'lastname' | 'is_company' | 'email' | 'username' | 'password' | 'cnpjf'>) => {
  const [check_email, check_username, check_password, check_cnpjf] = await Promise.all([
    validator.isEmail(user.email),
    checkUserExists(user.username),
    validator.isLength(user.password, { min: 6 }),
    () => {
      if (cpf.isValid(user.cnpjf) || cnpj.isValid(user.cnpjf)) {
        return true;
      } else {
        return false;
      }
    },
  ]);

  switch (false) {
    case check_email:
      throw { message: 'error.invalid_email', status: 400 };
      break;
    case check_username:
      throw { message: 'error.username_already_exists', status: 400 };
      break;
    case check_password:
      throw { message: 'error.invalid_email', status: 400 };
      break;
    case check_email:
      throw { message: 'error.invalid_password', status: 400 };
      break;
    case check_cnpjf():
      throw { message: 'error.invalid_email', status: 400 };
      break;
  }
  const hashed_password = await bcrypt.hash(user.password, SALT);
  const created_user = await UsersModel.create({ ...user, password: hashed_password });
  created_user.password = '';
  const token = await UAuth.createToken(created_user);

  return { ...created_user.get(), token };
};

const login = async (payload: string, password: string) => {
  const user = await UsersModel.findOne({
    where: {
      [Op.or]: [{ username: payload }, { cnpjf: payload }, { email: payload }],
    },
  });
  if (!user) {
    throw { msg: 'error.user_not_found', status: 404 };
  }

  const is_password_matching = await UAuth.passwordValidator(password, user.password);
  if (!is_password_matching) {
    throw { msg: 'error.forbidden', status: 403 };
  }
  const token = await UAuth.createToken(user.get());
  user.password = undefined!;
  return { ...user.get(), token };
};

const checkUserExists = async (username: string) => {
  const user = await UsersModel.findOne({ where: { username } });

  if (user?.username === username) {
    return false;
  } else {
    return true;
  }
};

const authService = {
  register,
  login,
};

export default authService;
