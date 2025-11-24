import { MigrationInterface, QueryRunner } from 'typeorm';

export class Typeorm1760096305835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('USE plataforma_therapy;');
    await queryRunner.query(`ALTER TABLE customers 
        MODIFY COLUMN status ENUM('pending_verification','active','inactive','banned') DEFAULT 'pending_verification';
        `);
  }

  public async down(): Promise<void> {}
}
