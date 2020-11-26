import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const createdUser = await new CreateUserService(fakeUserRepository).execute(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'something-password',
      }
    );

    expect(createdUser).toHaveProperty('id');
    expect(createdUser.email).toBe('johndoe@example.com');
  });

  it('should not be able to create two users using same email', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const createUserService = new CreateUserService(fakeUserRepository);

    await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'something-password',
    });

    expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'something-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
