import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';

let fakeUserRepository: FakeUserRepository;
let deleteUserService: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    deleteUserService = new DeleteUserService(fakeUserRepository);
  });

  it('should be able to delete a new user', async () => {
    const { id: user_id } = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'something-password',
    });

    const deletedUser = await deleteUserService.execute({ user_id });

    expect(deletedUser.disabled).toBeTruthy();
  });

  it('should not be able to delete user if that non exists', async () => {
    expect(
      deleteUserService.execute({
        user_id: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
