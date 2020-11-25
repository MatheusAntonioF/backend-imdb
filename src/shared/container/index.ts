import { container } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/repositories/UsersRepository';

import IMovieRepository from '@modules/movies/repositories/IMovieRepository';
import MovieRepository from '@modules/movies/infra/repositories/MovieRepository';
import IVoteRepository from '@modules/movies/repositories/IVoteRepository';
import VoteRepository from '@modules/movies/infra/repositories/VoteRepository';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IMovieRepository>(
  'MovieRepository',
  MovieRepository
);

container.registerSingleton<IVoteRepository>('VoteRepository', VoteRepository);
