import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreatePivotTableVote1606330722852
  implements MigrationInterface {
  private voteTable = new Table({
    name: 'votes',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'user_id',
        type: 'uuid',
      },
      {
        name: 'movie_id',
        type: 'uuid',
      },
      {
        name: 'vote',
        type: 'int',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  });

  private userIdForeignKey = new TableForeignKey({
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  private movieIdForeignKey = new TableForeignKey({
    columnNames: ['movie_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'movies',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.voteTable);

    return queryRunner.createForeignKeys('votes', [
      this.userIdForeignKey,
      this.movieIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.voteTable);

    return queryRunner.dropForeignKeys('votes', [
      this.userIdForeignKey,
      this.movieIdForeignKey,
    ]);
  }
}
