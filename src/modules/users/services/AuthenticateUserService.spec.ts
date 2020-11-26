import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate user', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const createUserService = new CreateUserService(fakeUserRepository);
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository
    );

    const user = await createUserService.execute({
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
    const fakeUserRepository = new FakeUserRepository();

    const createUserService = new CreateUserService(fakeUserRepository);
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository
    );

    await createUserService.execute({
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
    const fakeUsersRepository = new FakeUserRepository();

    const createUser = new CreateUserService(fakeUsersRepository);

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Johen Doe',
      email: 'john@example.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'john@example.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
