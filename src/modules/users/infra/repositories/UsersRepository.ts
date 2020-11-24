import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUser from '@modules/users/dtos/ICreateUser';
import User from '../entities/User';

class UsersRepository implements IUserRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user;
  }

  public async create(userData: ICreateUser): Promise<User> {
    const user = this.usersRepository.create(userData);

    await this.usersRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}

export default UsersRepository;
