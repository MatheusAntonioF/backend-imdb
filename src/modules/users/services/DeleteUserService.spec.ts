import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';

describe('DeleteUser', () => {
  it('should be able to delete a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const deleteUserService = new DeleteUserService(fakeUserRepository);

    const { id: user_id } = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'something-password',
    });

    const deletedUser = await deleteUserService.execute({ user_id });

    expect(deletedUser.disabled).toBeTruthy();
  });

  it('should not be able to delete user if that non exists', async () => {
    const fakeUserRepository = new FakeUserRepository();

    const deleteUserService = new DeleteUserService(fakeUserRepository);

    expect(
      deleteUserService.execute({
        user_id: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
