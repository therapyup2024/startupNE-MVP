import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1760214065643 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('USE plataforma_therapy;');
    await queryRunner.query(`ALTER TABLE agreements 
        ADD COLUMN status ENUM('inactive','active') DEFAULT 'inactive';
        `);
  }

  public async down(): Promise<void> {}
}
