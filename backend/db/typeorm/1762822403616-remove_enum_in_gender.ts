import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveEnumInGender1762822403616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('USE plataforma_therapy;');

    await queryRunner.query(`
    ALTER TABLE professionals MODIFY COLUMN gender VARCHAR(50)
    `);

    await queryRunner.query(`
    ALTER TABLE customers MODIFY COLUMN gender VARCHAR(50)
    `);

    await queryRunner.query(`
    ALTER TABLE users MODIFY COLUMN gender VARCHAR(50)
    `);
  }

  public async down(): Promise<void> {}
}
