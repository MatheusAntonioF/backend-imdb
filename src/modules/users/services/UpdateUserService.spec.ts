import { compare } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';
import User from '../infra/entities/User';

let fakeUserRepository: FakeUserRepository;
let updateUserService: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    updateUserService = new UpdateUserService(fakeUserRepository);
  });

  it('should be able to update a user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'something-password',
    });

    const updatedNameUser = { id: user.id, name: 'John Doe Updated' };

    await updateUserService.execute(updatedNameUser);

    expect(user.name).toBe(updatedNameUser.name);
  });

  it('should not be able to update user if that non exists', async () => {
    const updatedUser = { id: 'User non existent' } as User;

    expect(updateUserService.execute(updatedUser)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('should be able to get the password if some password is not passed', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'something-password',
    });

    const updatedUser = await updateUserService.execute({
      id: user.id,
      name: 'John Doe',
    } as User);

    expect(user.password).toBe(updatedUser?.password);
  });

  it('should be able to update a password to user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'something-password',
    });

    const newPassword = 'updated-password';

    const updatedUser = await updateUserService.execute({
      id: user.id,
      password: newPassword,
    });

    expect(await compare(newPassword, updatedUser?.password)).toBeTruthy();
  });

  it('should not be able to updated email if this email was have exists', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'email-existent@example.com',
      password: 'something-password',
    });

    expect(updateUserService.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
