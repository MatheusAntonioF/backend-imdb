import Movie from '../infra/entities/Movie';
import IMovieCreate from '../dtos/IMovieCreate';

export default interface IMovieRepository {
  findById(id: string): Promise<Movie | undefined>;
  findByName(name: string): Promise<Movie | undefined>;
  create(data: IMovieCreate): Promise<Movie>;
  save(user: Movie): Promise<Movie>;
  update(id: string, movie: Partial<Movie>): Promise<boolean>;
}
