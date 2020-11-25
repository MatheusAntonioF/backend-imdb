import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMovies1606316556749 implements MigrationInterface {
  private movieTable = new Table({
    name: 'movies',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'name',
        type: 'varchar',
      },
      {
        name: 'director',
        type: 'varchar',
      },
      {
        name: 'genre',
        type: 'varchar',
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(this.movieTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.movieTable);
  }
}
