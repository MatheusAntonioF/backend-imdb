import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1606240794200 implements MigrationInterface {
  private userTable = new Table({
    name: 'users',
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
        name: 'email',
        type: 'varchar',
        isUnique: true,
      },
      {
        name: 'password',
        type: 'varchar',
      },
      {
        name: 'adm',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
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
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return queryRunner.createTable(this.userTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.userTable);
  }
}
