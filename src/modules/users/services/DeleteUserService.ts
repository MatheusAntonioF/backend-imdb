import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';

import User from '../infra/entities/User';

interface IRequest {
  user_id: string;
}
@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const findedUser = await this.usersRepository.findById(user_id);

    if (!findedUser) throw new AppError('Users does not found', 400);

    const user = Object.assign(findedUser, { disabled: true });

    await this.usersRepository.save(user);

    return user;
  }
}

export default DeleteUserService;
