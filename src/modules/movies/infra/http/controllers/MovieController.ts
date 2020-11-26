import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMovieService from '@modules/movies/services/CreateMovieService';
import FilterMovieService from '@modules/movies/services/FilterMovieService';

interface ITeste {
  [key: string]: string;
}

class MovieController {
  async index(request: Request, response: Response): Promise<Response> {
    const filterBy = request.query as ITeste;

    const filteredMovies = await container
      .resolve(FilterMovieService)
      .execute({ filterBy });

    return response.json(filteredMovies);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, director, genre } = request.body;

    const createdMovie = await container
      .resolve(CreateMovieService)
      .execute({ name, director, genre });

    return response.json(createdMovie);
  }
}

export default MovieController;
