import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeAppointmentIdToUid1760283455639
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('USE plataforma_therapy;');
    await queryRunner.query(`ALTER TABLE appointments 
        DROP COLUMN id;
        `);
    await queryRunner.query(`ALTER TABLE appointments 
        ADD COLUMN uid CHAR(36) PRIMARY KEY;
        `);
    await queryRunner.query(`ALTER TABLE appointments 
        DROP COLUMN date;
        `);
    await queryRunner.query(`ALTER TABLE appointments 
        ADD COLUMN start_at TIMESTAMP;
        `);
    await queryRunner.query(`ALTER TABLE appointments 
        ADD COLUMN finish_at TIMESTAMP;
        `);
    await queryRunner.query(`ALTER TABLE appointments 
        MODIFY COLUMN status ENUM('pending', 'scheduled','rescheduled','cancelled','completed') DEFAULT 'pending';
        `);
  }

  public async down(): Promise<void> {}
}
