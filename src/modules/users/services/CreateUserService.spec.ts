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
        adm: false,
      }
    );

    expect(createdUser).toHaveProperty('id');
    expect(createdUser.email).toBe('johndoe@example.com');
  });
});
