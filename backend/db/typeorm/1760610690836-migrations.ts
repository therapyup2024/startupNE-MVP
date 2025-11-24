import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1760610690836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('USE plataforma_therapy;');
    await queryRunner.query(`ALTER TABLE professionals 
      ADD COLUMN avatar_url TEXT;
      `);
    await queryRunner.query(`ALTER TABLE customers 
      ADD COLUMN avatar_url TEXT;
      `);
    await queryRunner.query(`ALTER TABLE users 
      ADD COLUMN avatar_url TEXT;
        `);
  }

  public async down(): Promise<void> {}
}
