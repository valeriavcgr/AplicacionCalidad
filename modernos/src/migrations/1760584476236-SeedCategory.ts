import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedCategory1760584476236 implements MigrationInterface {
    name = 'SeedCategory1760584476236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO category (name,description) VALUES
            ('samsung','celulares marca samsung'),
            ('iphone','celulares marca iphone'),
            ('xiaomi','celulares marca xiaomi')
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM category WHERE name IN ('samsung', 'iphone', 'xiaomi')
            `)
    }

}
