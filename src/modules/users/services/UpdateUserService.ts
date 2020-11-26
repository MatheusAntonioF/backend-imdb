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
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute(
    userData: IRequest
  ): Promise<Omit<User, 'hiddenPassword'>> {
    const findedUser = await this.usersRepository.findById(userData.id);

    let findedUserByEmail;

    if (userData.email) {
      findedUserByEmail = await this.usersRepository.findByEmail(
        userData.email
      );
    }

    if (findedUserByEmail) throw new AppError('This email is not available');

    if (!findedUser) throw new AppError('User does not found', 400);

    let newPassword;
    if (userData.password) {
      newPassword = await hash(userData.password, 8);
    } else {
      newPassword = findedUser.password;
    }

    const updatedUser = await this.usersRepository.update(
      userData.id,
      Object.assign(findedUser, userData, {
        password: newPassword,
      })
    );

    return updatedUser;
  }
}

export default UpdateUserService;
