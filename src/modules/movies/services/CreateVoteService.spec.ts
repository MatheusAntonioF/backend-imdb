import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeVoteRepository from '../repositories/fakes/FakeVoteRepository';
import CreateVoteService from './CreateVoteService';

import FakeMovieRepository from '../repositories/fakes/FakeMovieRepository';
import CreateMovieService from './CreateMovieService';

let fakeVoteRepository: FakeVoteRepository;
let fakeUserRepository: FakeUserRepository;
let fakeMovieRepository: FakeMovieRepository;
let createUserService: CreateUserService;
let createMovieService: CreateMovieService;
let createVoteService: CreateVoteService;

describe('CreateVote', () => {
  beforeEach(() => {
    fakeVoteRepository = new FakeVoteRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeMovieRepository = new FakeMovieRepository();
    createUserService = new CreateUserService(fakeUserRepository);
    createMovieService = new CreateMovieService(fakeMovieRepository);
    createVoteService = new CreateVoteService(
      fakeVoteRepository,
      fakeUserRepository
    );
  });

  it('should be able to create a new vote', async () => {
    const { id: user_id } = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'some-password',
    });

    const { id: movie_id } = await createMovieService.execute({
      name: 'Some Movie Name',
      director: 'John Doe',
      genre: 'Adventure',
    });

    const createdVote = await createVoteService.execute({
      user_id,
      movie_id,
      vote: 2,
    });

    expect(createdVote).toHaveProperty('id');
  });

  it('should not be able to create a vote if it is not between 1 and 4', async () => {
    const { id: user_id } = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'some-password',
    });

    const { id: movie_id } = await createMovieService.execute({
      name: 'Some Movie Name',
      director: 'John Doe',
      genre: 'Adventure',
    });

    expect(
      createVoteService.execute({
        user_id,
        movie_id,
        vote: 7,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the vote if it exists', async () => {
    const { id: user_id } = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'some-password',
    });

    const { id: movie_id } = await createMovieService.execute({
      name: 'Some Movie Name',
      director: 'John Doe',
      genre: 'Adventure',
    });

    const createdVote = await createVoteService.execute({
      user_id,
      movie_id,
      vote: 2,
    });

    await createVoteService.execute({
      user_id,
      movie_id,
      vote: 1,
    });

    expect(createdVote.vote).toBe(1);
  });

  it('should not be able to adm user vote', async () => {
    const { id: user_id } = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'some-password',
      adm: true,
    });

    const { id: movie_id } = await createMovieService.execute({
      name: 'Some Movie Name',
      director: 'John Doe',
      genre: 'Adventure',
    });

    expect(
      createVoteService.execute({
        user_id,
        movie_id,
        vote: 1,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
