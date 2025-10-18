import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelations1760724502955 implements MigrationInterface {
    name = 'AddRelations1760724502955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`age\` \`age\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`categoryId\``);
    }

}
