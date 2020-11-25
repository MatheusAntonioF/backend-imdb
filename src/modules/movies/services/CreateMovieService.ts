import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Movie from '../infra/entities/Movie';
import IMovieRepository from '../repositories/IMovieRepository';

interface IRequest {
  name: string;
  director: string;
  genre: string;
}

@injectable()
class CreateMovieService {
  constructor(
    @inject('MovieRepository')
    private moviesRepository: IMovieRepository
  ) {}

  public async execute({ name, director, genre }: IRequest): Promise<Movie> {
    const findedMovie = await this.moviesRepository.findByName(name);

    if (findedMovie) throw new AppError('Movie with this name was exists', 400);

    const createdMovie = await this.moviesRepository.create({
      name,
      director,
      genre,
    });

    return createdMovie;
  }
}

export default CreateMovieService;
