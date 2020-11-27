import { uuid } from 'uuidv4';

import IMovieRepository from '@modules/movies/repositories/IMovieRepository';
import IMovieCreate from '@modules/movies/dtos/IMovieCreate';
import Vote from '@modules/movies/infra/entities/Vote';
import Movie from '../../infra/entities/Movie';

class FakeMovieRepository implements IMovieRepository {
  private movies: Movie[] = [];

  public async findById(id: string): Promise<Movie | undefined> {
    const findedMovie = this.movies.find(movie => movie.id === id);

    return findedMovie;
  }

  public async addVoteToMovie(vote: Vote): Promise<void> {
    this.movies.filter(movie => {
      if (movie.id === vote.movie_id) return movie.votes.push(vote);

      return movie;
    });
  }

  public async findMovies(
    filterBy: keyof Movie,
    value: string
  ): Promise<Movie[]> {
    const filteredMovies = this.movies.filter(
      movie => movie[filterBy] === value
    );

    return filteredMovies;
  }

  public async findByName(name: string): Promise<Movie | undefined> {
    const findedMovie = this.movies.find(movie => movie.name === name);

    return findedMovie;
  }

  public async create(movieData: IMovieCreate): Promise<Movie> {
    const movie = new Movie();

    Object.assign(movie, movieData, { id: uuid() }, { votes: [] });

    this.movies.push(movie);

    return movie;
  }

  public async save(movie: Movie): Promise<Movie> {
    this.movies.push(movie);

    return movie;
  }

  public async update(id: string, movie: Partial<Movie>): Promise<Movie> {
    const findedMovie = this.movies.find(movieToFind => movieToFind.id === id);

    const updatedMovie = Object.assign(findedMovie, movie);

    this.movies.filter(movieToFilter => {
      if (movieToFilter.id === updatedMovie.id) return updatedMovie;
      return movieToFilter;
    });

    return updatedMovie;
  }
}

export default FakeMovieRepository;
