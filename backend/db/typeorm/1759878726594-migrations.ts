import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1759878726594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE DATABASE IF NOT EXISTS plataforma_therapy
        DEFAULT CHARACTER SET utf8mb4
        DEFAULT COLLATE utf8mb4_unicode_ci;
    `,
    );
    await queryRunner.query(`USE plataforma_therapy`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS agreements (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            text TEXT NOT NULL,
            type VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS customers (
            uid CHAR(36) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            gender ENUM('male','female','other') DEFAULT 'other',
            document VARCHAR(50),
            is_foreigner BOOLEAN DEFAULT FALSE,
            status ENUM('active','inactive','banned') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS professionals (
            uid CHAR(36) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            gender ENUM('male','female','other') DEFAULT 'other',
            document VARCHAR(50),
            license_number VARCHAR(50),
            specialty VARCHAR(100),
            approach VARCHAR(100),
            description TEXT,
            status ENUM('pending_verification','active','inactive','banned') DEFAULT 'pending_verification',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS appointments (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            customer_uid CHAR(36) NOT NULL,
            professional_uid CHAR(36) NOT NULL,
            title VARCHAR(255),
            description TEXT,
            notes TEXT,
            date DATETIME NOT NULL,
            status ENUM('scheduled','rescheduled','cancelled','completed') DEFAULT 'scheduled',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (customer_uid) REFERENCES customers(uid),
            FOREIGN KEY (professional_uid) REFERENCES professionals(uid)
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS chats (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            customer_uid CHAR(36) NOT NULL,
            professional_uid CHAR(36) NOT NULL,
            status ENUM('active','archived','deleted') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (customer_uid) REFERENCES customers(uid),
            FOREIGN KEY (professional_uid) REFERENCES professionals(uid)
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS chat_messages (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            chat_id BIGINT NOT NULL,
            sender_uid CHAR(36) NOT NULL,
            content TEXT,
            status ENUM('sent','delivered','read','deleted') DEFAULT 'sent',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (chat_id) REFERENCES chats(id)
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS access_plans (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            amount DECIMAL(10,2) NOT NULL,
            status ENUM('active','inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS professional_access_plans (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            professional_uid CHAR(36) NOT NULL,
            access_plan_id BIGINT NOT NULL,
            expires_at DATETIME,
            status ENUM('active','expired','cancelled') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (professional_uid) REFERENCES professionals(uid),
            FOREIGN KEY (access_plan_id) REFERENCES access_plans(id)
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS modules (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            status ENUM('active','inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS accessplan_modules (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            access_plan_id BIGINT NOT NULL,
            module_id BIGINT NOT NULL,
            FOREIGN KEY (access_plan_id) REFERENCES access_plans(id),
            FOREIGN KEY (module_id) REFERENCES modules(id)
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS user_roles (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            status ENUM('active','inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS user_modules (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            status ENUM('active','inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS userrole_modules (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            role_id BIGINT NOT NULL,
            module_id BIGINT NOT NULL,
            FOREIGN KEY (role_id) REFERENCES user_roles(id),
            FOREIGN KEY (module_id) REFERENCES user_modules(id)
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (
            uid CHAR(36) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            gender ENUM('male','female','other') DEFAULT 'other',
            document VARCHAR(50),
            user_role_id BIGINT NOT NULL,
            status ENUM('active','inactive') DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_role_id) REFERENCES user_roles(id)
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS payments (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            payer_uid CHAR(36) NOT NULL,
            receiver_uid CHAR(36) NOT NULL,
            type ENUM('credit','debit','pix') NOT NULL,
            provider VARCHAR(100),
            amount DECIMAL(10,2) NOT NULL,
            description TEXT,
            status ENUM('pending','paid','refunded','failed') DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS customer_agreements (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            customer_uid CHAR(36) NOT NULL,
            agreement_id BIGINT NOT NULL,
            accepted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (customer_uid) REFERENCES customers(uid),
            FOREIGN KEY (agreement_id) REFERENCES agreements(id)
        );`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS professional_agreements (
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            professional_uid CHAR(36) NOT NULL,
            agreement_id BIGINT NOT NULL,
            accepted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (professional_uid) REFERENCES professionals(uid),
            FOREIGN KEY (agreement_id) REFERENCES agreements(id)
        );`);

    await queryRunner.query(
      'CREATE INDEX idx_customers_email ON customers(email);',
    );
    await queryRunner.query(
      'CREATE INDEX idx_professionals_email ON professionals(email);',
    );
    await queryRunner.query('CREATE INDEX idx_users_email ON users(email);');
    await queryRunner.query(
      'CREATE INDEX idx_customers_status ON customers(status);',
    );
    await queryRunner.query(
      'CREATE INDEX idx_professionals_status ON professionals(status);',
    );
    await queryRunner.query(
      'CREATE INDEX idx_appointments_status ON appointments(status);',
    );
    await queryRunner.query(
      'CREATE INDEX idx_payments_status ON payments(status);',
    );
    await queryRunner.query(
      'CREATE INDEX idx_appointments_date ON appointments(date);',
    );
    await queryRunner.query(
      'CREATE INDEX idx_professional_access_expiry ON professional_access_plans(expires_at);',
    );
    await queryRunner.query(
      'CREATE INDEX idx_chats_customer ON chats(customer_uid);',
    );
    await queryRunner.query(
      'CREATE INDEX idx_chats_professional ON chats(professional_uid);',
    );
    await queryRunner.query(
      'CREATE INDEX idx_payments_payer ON payments(payer_uid);',
    );
    await queryRunner.query(
      'CREATE INDEX idx_payments_receiver ON payments(receiver_uid);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0;');
    await queryRunner.query('USE plataforma_therapy;');
    await queryRunner.query('DROP INDEX idx_customers_email ON customers;');
    await queryRunner.query(
      'DROP INDEX idx_professionals_email ON professionals;',
    );
    await queryRunner.query('DROP INDEX idx_users_email ON users;');
    await queryRunner.query('DROP INDEX idx_customers_status ON customers;');
    await queryRunner.query(
      'DROP INDEX idx_professionals_status ON professionals;',
    );
    await queryRunner.query(
      'DROP INDEX idx_appointments_status ON appointments;',
    );
    await queryRunner.query('DROP INDEX idx_payments_status ON payments;');
    await queryRunner.query(
      'DROP INDEX idx_appointments_date ON appointments;',
    );
    await queryRunner.query(
      'DROP INDEX idx_professional_access_expiry ON professional_access_plans;',
    );
    await queryRunner.query('DROP INDEX idx_chats_customer ON chats;');
    await queryRunner.query('DROP INDEX idx_chats_professional ON chats;');
    await queryRunner.query('DROP INDEX idx_payments_payer ON payments;');
    await queryRunner.query('DROP INDEX idx_payments_receiver ON payments;');
    await queryRunner.query('DROP TABLE professional_agreements;');
    await queryRunner.query('DROP TABLE customer_agreements;');
    await queryRunner.query('DROP TABLE chat_messages;');
    await queryRunner.query('DROP TABLE chats;');
    await queryRunner.query('DROP TABLE appointments;');
    await queryRunner.query('DROP TABLE professional_access_plans;');
    await queryRunner.query('DROP TABLE accessplan_modules;');
    await queryRunner.query('DROP TABLE userrole_modules;');
    await queryRunner.query('DROP TABLE payments;');
    await queryRunner.query('DROP TABLE users;');
    await queryRunner.query('DROP TABLE user_roles;');
    await queryRunner.query('DROP TABLE user_modules;');
    await queryRunner.query('DROP TABLE professionals;');
    await queryRunner.query('DROP TABLE customers;');
    await queryRunner.query('DROP TABLE access_plans;');
    await queryRunner.query('DROP TABLE modules;');
    await queryRunner.query('DROP TABLE agreements;');
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
}
