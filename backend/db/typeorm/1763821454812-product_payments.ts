import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductPayments1763821454812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('USE plataforma_therapy;');
    await queryRunner.query(`ALTER TABLE payments 
      ADD COLUMN product_id int NOT NULL;
    `);
    await queryRunner.query(`ALTER TABLE payments 
      MODIFY COLUMN type varchar(255) NULL;
    `);
    await queryRunner.query(`ALTER TABLE payments 
      ADD COLUMN link_url varchar(255);
    `);
    await queryRunner.query(`ALTER TABLE payments 
      DROP COLUMN amount;
    `);
    await queryRunner.query(`ALTER TABLE payments 
      ADD COLUMN value BIGINT NOT NULL;
    `);
    await queryRunner.query(`ALTER TABLE products 
      ADD COLUMN name varchar(255) NOT NULL;
    `);
    await queryRunner.query(`ALTER TABLE products 
      ADD COLUMN link_url varchar(255);
    `);
    await queryRunner.query(`ALTER TABLE products 
      MODIFY COLUMN amount int NULL;
    `);
    await queryRunner.query(`ALTER TABLE products 
      ADD COLUMN value BIGINT NOT NULL;
    `);
    await queryRunner.query(`ALTER TABLE appointments 
      ADD COLUMN payment_id BIGINT;
    `);
  }

  public async down(): Promise<void> {}
}
