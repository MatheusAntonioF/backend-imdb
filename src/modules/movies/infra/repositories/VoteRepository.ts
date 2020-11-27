import { Repository, getRepository } from 'typeorm';

import IVoteRepository from '@modules/movies/repositories/IVoteRepository';
import IVoteCreate from '@modules/movies/dtos/IVoteCreate';
import Vote from '../entities/Vote';

class VoteRepository implements IVoteRepository {
  private voteRepository: Repository<Vote>;

  constructor() {
    this.voteRepository = getRepository(Vote);
  }

  async create(vote: IVoteCreate): Promise<Vote> {
    const createdVote = this.voteRepository.create(vote);

    await this.voteRepository.save(createdVote);

    return createdVote;
  }

  async save(vote: Vote): Promise<Vote> {
    const createdVote = await this.voteRepository.save(vote);

    return createdVote;
  }

  async findVote(user_id: string, movie_id: string): Promise<Vote | undefined> {
    const findedVote = await this.voteRepository.findOne({
      where: { user_id, movie_id },
    });

    return findedVote;
  }
}

export default VoteRepository;
