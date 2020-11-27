import AppError from '@shared/errors/AppError';
import FakeMovieRepository from '../repositories/fakes/FakeMovieRepository';
import FilterMovieService from './FilterMovieService';

describe('FilterMovie', () => {
  it('should be able to filter movie', async () => {
    const fakeMovieRepository = new FakeMovieRepository();

    const filterMovieService = new FilterMovieService(fakeMovieRepository);

    await fakeMovieRepository.create({
      name: 'Someone name movie',
      director: 'Someone Director',
      genre: 'adventure',
    });

    const filterBy = { name: 'Someone name movie' };

    const filteredMovies = await filterMovieService.execute({ filterBy });

    expect(filteredMovies[0].name).toBe('Someone name movie');
  });

  it('should not be able to filter movie to invalid param', async () => {
    const fakeMovieRepository = new FakeMovieRepository();

    const filterMovieService = new FilterMovieService(fakeMovieRepository);

    await fakeMovieRepository.create({
      name: 'Someone name movie',
      director: 'Someone Director',
      genre: 'adventure',
    });

    const filterBy = { invalidParam: 'Someone name movie' };

    expect(filterMovieService.execute({ filterBy })).rejects.toBeInstanceOf(
      AppError
    );
  });
});
