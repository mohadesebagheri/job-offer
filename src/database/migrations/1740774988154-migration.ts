import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class Migration1740774988154 implements MigrationInterface {
  name = 'Migration1740774988154';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'job-offer',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'jobId',
            type: 'uuid',
            isUnique: true,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'location',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'remote',
            type: 'boolean',
            default: false,
          },
          {
            name: 'salaryMin',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'salaryMax',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'currency',
            type: 'varchar',
            default: "'USD'",
          },
          {
            name: 'company',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'website',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'industry',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'experience',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'technologies',
            type: 'text',
          },
          {
            name: 'postedDate',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // ✅ Create an index on jobId for fast searching
    await queryRunner.createIndex(
      'job-offer',
      new TableIndex({
        name: 'IDX_JOB_OFFER_JOBID',
        columnNames: ['jobId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('job-offer', 'IDX_JOB_OFFER_JOBID');
    await queryRunner.dropTable('job-offer');
  }
}
