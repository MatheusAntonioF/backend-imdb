import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
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
    private votesRepository: IVoteRepository,
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({ user_id, movie_id, vote }: IRequest): Promise<Vote> {
    if (vote > 4) throw new AppError('The vote must be between 1 and 4');

    const findedUser = await this.usersRepository.findById(user_id);

    if (findedUser?.adm) throw new AppError('A adm user cannot vote');

    const findedVote = await this.votesRepository.findVote(user_id, movie_id);

    let newVote;

    if (findedVote) {
      newVote = Object.assign(findedVote, { vote });

      await this.votesRepository.save(newVote);
    } else {
      newVote = await this.votesRepository.create({ user_id, movie_id, vote });
    }

    return newVote;
  }
}

export default CreateVoteService;
