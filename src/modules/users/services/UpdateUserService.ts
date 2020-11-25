import { injectable, inject } from 'tsyringe';

import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import User from '../infra/entities/User';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute(
    userData: IRequest
  ): Promise<Omit<User, 'hiddenPassword'> | undefined> {
    const findedUser = await this.usersRepository.findById(userData.id);

    if (!findedUser) throw new AppError('User does not found', 400);

    let newPassword;
    if (userData.password) {
      newPassword = await hash(userData.password, 8);
    } else {
      newPassword = findedUser.password;
    }

    const updatedUser = Object.assign(findedUser, userData, {
      password: newPassword,
    });

    await this.usersRepository.update(userData.id, {
      ...userData,
    });

    return updatedUser;
  }
}

export default CreateUserService;
