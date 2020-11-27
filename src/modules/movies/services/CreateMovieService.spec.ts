import AppError from '@shared/errors/AppError';
import FakeMovieRepository from '../repositories/fakes/FakeMovieRepository';
import CreateMovieService from './CreateMovieService';

describe('CreateMovie', () => {
  it('should be able to create movie', async () => {
    const fakeMovieRepository = new FakeMovieRepository();

    const createMovieService = new CreateMovieService(fakeMovieRepository);

    const createdMovie = await createMovieService.execute({
      name: 'Someone name movie',
      director: 'Someone Director',
      genre: 'adventure',
    });

    expect(createdMovie).toHaveProperty('id');
    expect(createdMovie.name).toBe('Someone name movie');
  });

  it('should not be able to create movie with the name existing', async () => {
    const fakeMovieRepository = new FakeMovieRepository();

    const createMovieService = new CreateMovieService(fakeMovieRepository);

    await createMovieService.execute({
      name: 'Someone name movie',
      director: 'Someone Director',
      genre: 'adventure',
    });

    expect(
      createMovieService.execute({
        name: 'Someone name movie',
        director: 'Someone Director',
        genre: 'adventure',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
