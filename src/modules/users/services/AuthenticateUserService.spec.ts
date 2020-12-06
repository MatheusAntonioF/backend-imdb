import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let creteUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    creteUserService = new CreateUserService(fakeUserRepository);
    authenticateUserService = new AuthenticateUserService(fakeUserRepository);
  });

  it('should be able to authenticate user', async () => {
    const user = await creteUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'some-password',
    });

    const response = await authenticateUserService.execute({
      email: user.email,
      password: 'some-password',
    });

    expect(response).toHaveProperty('token');
    expect(user).toEqual(response.user);
  });

  it('should not be able to authenticate user if the email is wrong', async () => {
    await creteUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'some-password',
    });

    expect(
      authenticateUserService.execute({
        email: 'wrongemail@example.com',
        password: 'some-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user if the password is wrong', async () => {
    await creteUserService.execute({
      name: 'Johen Doe',
      email: 'john@example.com',
      password: '123456',
    });

    expect(
      authenticateUserService.execute({
        email: 'john@example.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
