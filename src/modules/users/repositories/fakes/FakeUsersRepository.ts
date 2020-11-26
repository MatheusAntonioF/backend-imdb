import { uuid } from 'uuidv4';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUser from '@modules/users/dtos/ICreateUser';

import User from '../../infra/entities/User';

class UsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findedUser = this.users.find(user => user.id === id);

    return findedUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findedUser = this.users.find(user => user.email === email);

    return findedUser;
  }

  public async create(userData: ICreateUser): Promise<User> {
    const user = new User();

    Object.assign(user, userData, { id: uuid() });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  public async update(id: string, user: Partial<User>): Promise<User> {
    const findedUser = this.users.find(userToFind => userToFind.id === id);

    const updatedUser = Object.assign(findedUser, user);

    this.users.filter(userToFilter => {
      if (userToFilter.id === updatedUser.id) return updatedUser;
      return userToFilter;
    });

    return updatedUser;
  }
}

export default UsersRepository;
