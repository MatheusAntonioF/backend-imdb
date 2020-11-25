import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateVoteService from '@modules/movies/services/CreateVoteService';

class VoteController {
  async create(request: Request, response: Response): Promise<Response> {
    const { user_id, movie_id } = request.params;

    const { vote } = request.body;

    const createdVote = await container
      .resolve(CreateVoteService)
      .execute({ user_id, movie_id, vote });

    return response.json(createdVote);
  }
}

export default VoteController;
