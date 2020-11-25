import { getRepository, Repository } from 'typeorm';

import IMovieRepository from '@modules/movies/repositories/IMovieRepository';
import IMovieCreate from '@modules/movies/dtos/IMovieCreate';
import Movie from '../entities/Movie';

class MovieRepository implements IMovieRepository {
  private movieRepository: Repository<Movie>;

  constructor() {
    this.movieRepository = getRepository(Movie);
  }

  public async findById(id: string): Promise<Movie | undefined> {
    const findedMovie = await this.movieRepository.findOne(id);

    return findedMovie;
  }

  public async findByName(name: string): Promise<Movie | undefined> {
    const findedMovie = await this.movieRepository.findOne({ where: { name } });

    return findedMovie;
  }

  public async create(movieData: IMovieCreate): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);

    await this.movieRepository.save(movie);

    return movie;
  }

  public async save(movie: Movie): Promise<Movie> {
    return this.movieRepository.save(movie);
  }

  public async update(id: string, movie: Partial<Movie>): Promise<boolean> {
    const updatedMovie = await this.movieRepository.update(id, movie);

    return !!updatedMovie.raw;
  }
}

export default MovieRepository;
