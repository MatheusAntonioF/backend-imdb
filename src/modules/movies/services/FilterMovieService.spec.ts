import AppError from '@shared/errors/AppError';
import FakeMovieRepository from '../repositories/fakes/FakeMovieRepository';
import FilterMovieService from './FilterMovieService';

let fakeMovieRepository: FakeMovieRepository;
let filterMovieService: FilterMovieService;

describe('FilterMovie', () => {
  beforeEach(() => {
    fakeMovieRepository = new FakeMovieRepository();
    filterMovieService = new FilterMovieService(fakeMovieRepository);
  });

  it('should be able to filter movie', async () => {
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
