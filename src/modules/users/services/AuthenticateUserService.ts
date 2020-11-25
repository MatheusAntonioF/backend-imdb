import { injectable, inject } from 'tsyringe';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import IUserRepository from '../repositories/IUsersRepository';
import User from '../infra/entities/User';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const findedUser = await this.usersRepository.findByEmail(email);

    if (!findedUser) throw new AppError('Email or password was incorrect');

    const passwordMatch = await compare(password, findedUser.password);

    if (!passwordMatch) throw new AppError('Email or password was incorrect');

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({ isAdm: findedUser.adm }, secret, {
      subject: findedUser.id,
      expiresIn,
    });

    return { user: findedUser, token };
  }
}

export default AuthenticateUserService;
