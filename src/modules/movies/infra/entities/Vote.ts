import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/entities/User';
import Movie from './Movie';

@Entity('votes')
class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ name: 'movie_id' })
  movie_id: string;

  // N votos <-> 1 filme
  @ManyToOne(() => Movie, movie => movie.votes)
  @JoinColumn({ name: 'movie_id', referencedColumnName: 'id' })
  movie: Movie;

  @Column()
  vote: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Vote;
