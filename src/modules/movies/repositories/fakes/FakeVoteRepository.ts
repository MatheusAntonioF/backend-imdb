import { uuid } from 'uuidv4';

import IVoteRepository from '@modules/movies/repositories/IVoteRepository';
import IVoteCreate from '@modules/movies/dtos/IVoteCreate';
import Vote from '../../infra/entities/Vote';

class FakeVoteRepository implements IVoteRepository {
  private votes: Vote[] = [];

  async create(vote: IVoteCreate): Promise<Vote> {
    const createdVote = new Vote();

    Object.assign(createdVote, vote, { id: uuid() });

    this.votes.push(createdVote);

    return createdVote;
  }

  async save(vote: Vote): Promise<Vote> {
    this.votes.push(vote);

    return vote;
  }

  async findVote(user_id: string, movie_id: string): Promise<Vote | undefined> {
    const findedVote = this.votes.find(
      vote => vote.user_id === user_id && vote.movie_id === movie_id
    );

    return findedVote;
  }
}

export default FakeVoteRepository;
