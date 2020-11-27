import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeMovieRepository from '../repositories/fakes/FakeMovieRepository';
import CreateMovieService from './CreateMovieService';

import FakeVoteRepository from '../repositories/fakes/FakeVoteRepository';
import CreateVoteService from './CreateVoteService';

import GetMovieService from './GetMovieService';

describe('GetMovie', () => {
  it('should be able to get a movie by id', async () => {
    const fakeVoteRepository = new FakeVoteRepository();
    const fakeUserRepository = new FakeUserRepository();
    const fakeMovieRepository = new FakeMovieRepository();

    const { id: user_id } = await new CreateUserService(
      fakeUserRepository
    ).execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'some-password',
    });

    const { id: movie_id } = await new CreateMovieService(
      fakeMovieRepository
    ).execute({
      name: 'Some Movie Name',
      director: 'John Doe',
      genre: 'Adventure',
    });

    let newVote;

    newVote = await new CreateVoteService(
      fakeVoteRepository,
      fakeUserRepository
    ).execute({
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

    const { findedMovie, averageVote } = await new GetMovieService(
      fakeMovieRepository
    ).execute(movie_id);

    expect(findedMovie?.name).toBe('Some Movie Name');
    expect(averageVote).toBe(2);
  });

  it('should not be able to get a movie if it dont exists', async () => {
    const fakeMovieRepository = new FakeMovieRepository();

    expect(
      new GetMovieService(fakeMovieRepository).execute('movie-id-non-existent')
    ).rejects.toBeInstanceOf(AppError);
  });
});
