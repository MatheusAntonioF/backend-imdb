import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IVoteRepository from '../repositories/IVoteRepository';
import Vote from '../infra/entities/Vote';

interface IRequest {
  user_id: string;
  movie_id: string;
  vote: number;
}

@injectable()
class CreateVoteService {
  constructor(
    @inject('VoteRepository')
    private votesRepository: IVoteRepository
  ) {}

  public async execute({ user_id, movie_id, vote }: IRequest): Promise<Vote> {
    if (vote > 4) throw new AppError('The vote must be between 1 and 4');

    const findedVote = await this.votesRepository.findVote(user_id, movie_id);

    let newVote;

    if (findedVote) {
      newVote = Object.assign(findedVote, { vote });
    } else {
      newVote = await this.votesRepository.create({ user_id, movie_id, vote });
    }

    await this.votesRepository.create(newVote);

    return newVote;
  }
}

export default CreateVoteService;
