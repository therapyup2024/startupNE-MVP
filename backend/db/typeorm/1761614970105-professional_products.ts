import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfessionalProducts1761614970105 implements MigrationInterface {
  name = 'ProfessionalProducts1761614970105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('USE plataforma_therapy;');
    await queryRunner.query(`CREATE TABLE products (
            id int NOT NULL AUTO_INCREMENT, 
            type varchar(255) NOT NULL,
            amount decimal(10,2) NOT NULL,
            description text NULL,
            status enum ('active', 'inactive') NOT NULL DEFAULT 'active',
            created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            professional_uid char(36) NULL, PRIMARY KEY (id)) ENGINE=InnoDB
        `);
  }

  public async down(): Promise<void> {}
}
