import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMovieRepository from '../repositories/IMovieRepository';
import Movie from '../infra/entities/Movie';

interface IResponse {
  findedMovie: Movie | undefined;
  averageVote: number;
}

@injectable()
class GetMovieService {
  constructor(
    @inject('MovieRepository')
    private moviesRepository: IMovieRepository
  ) {}

  public async execute(id: string): Promise<IResponse | undefined> {
    const findedMovie = await this.moviesRepository.findById(id);

    if (!findedMovie) throw new AppError('Movie does not found');

    const { votes } = findedMovie;

    const totalVotes = votes.reduce(
      (total, currentVote) => total + currentVote.vote,
      0
    );

    const averageVote = totalVotes / votes.length;

    delete findedMovie.votes;

    return { findedMovie, averageVote };
  }
}

export default GetMovieService;
