import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1760274174129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('USE plataforma_therapy;');
    await queryRunner.query(`ALTER TABLE professional_agreements 
        DROP COLUMN id;
        `);
    await queryRunner.query(`ALTER TABLE professional_agreements 
        ADD COLUMN uid CHAR(36) PRIMARY KEY;
        `);
  }

  public async down(): Promise<void> {}
}
