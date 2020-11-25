import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateMovieService from '@modules/movies/services/CreateMovieService';

class MovieController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, director, genre } = request.body;

    const createdMovie = await container
      .resolve(CreateMovieService)
      .execute({ name, director, genre });

    return response.json(createdMovie);
  }
}

export default MovieController;
