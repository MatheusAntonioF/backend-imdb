import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeMovieRepository from '../repositories/fakes/FakeMovieRepository';
import CreateMovieService from './CreateMovieService';

import FakeVoteRepository from '../repositories/fakes/FakeVoteRepository';
import CreateVoteService from './CreateVoteService';

import GetMovieService from './GetMovieService';

let fakeVoteRepository: FakeVoteRepository;
let fakeUserRepository: FakeUserRepository;
let fakeMovieRepository: FakeMovieRepository;
let createUserService: CreateUserService;
let createMovieService: CreateMovieService;
let createVoteService: CreateVoteService;
let getMovieService: GetMovieService;

describe('GetMovie', () => {
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
    getMovieService = new GetMovieService(fakeMovieRepository);
  });

  it('should be able to get a movie by id', async () => {
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

    let newVote;

    newVote = await createVoteService.execute({
      user_id,
      movie_id,
      vote: 2,
    });

    await fakeMovieRepository.addVoteToMovie(newVote);

    newVote = await new CreateVoteService(
      fakeVoteRepository,
      fakeUserRepository
    ).execute({
      user_id,
      movie_id,
      vote: 2,
    });

    await fakeMovieRepository.addVoteToMovie(newVote);

    const { findedMovie, averageVote } = await getMovieService.execute(
      movie_id
    );

    expect(findedMovie?.name).toBe('Some Movie Name');
    expect(averageVote).toBe(2);
  });

  it('should not be able to get a movie if it dont exists', async () => {
    expect(
      getMovieService.execute('movie-id-non-existent')
    ).rejects.toBeInstanceOf(AppError);
  });
});
