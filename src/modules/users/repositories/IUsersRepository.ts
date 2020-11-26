import User from '../infra/entities/User';

import ICreateUserDTO from '../dtos/ICreateUser';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
}
