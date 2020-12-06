import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUserService = new CreateUserService(fakeUserRepository);
  });

  it('should be able to create a new user', async () => {
    const createdUser = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'something-password',
    });

    expect(createdUser).toHaveProperty('id');
    expect(createdUser.email).toBe('johndoe@example.com');
  });

  it('should not be able to create two users using same email', async () => {
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
