import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Movie from '../infra/entities/Movie';
import IMovieRepository from '../repositories/IMovieRepository';

interface IRequest {
  filterBy: { [key: string]: string };
}

@injectable()
class FilterMovieService {
  constructor(
    @inject('MovieRepository')
    private moviesRepository: IMovieRepository
  ) {}

  public async execute({ filterBy }: IRequest): Promise<Movie[]> {
    const params = String(...Object.entries(filterBy));

    const [toFilter, value] = params.split(',');

    const isValidParam = ['name', 'director', 'genre'].includes(toFilter);

    if (!isValidParam) throw new AppError('This param is invalid');

    const filteredMovies = await this.moviesRepository.findMovies(
      toFilter,
      value
    );

    return filteredMovies;
  }
}

export default FilterMovieService;
