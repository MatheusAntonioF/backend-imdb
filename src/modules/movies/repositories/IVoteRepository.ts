import IVoteCreate from '../dtos/IVoteCreate';
import Vote from '../infra/entities/Vote';

export default interface IVoteRepository {
  findVote(user_id: string, movie_id: string): Promise<Vote | undefined>;
  create(vote: IVoteCreate): Promise<Vote>;
  save(vote: IVoteCreate): Promise<Vote>;
}
