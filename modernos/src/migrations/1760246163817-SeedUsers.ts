import { MigrationInterface, QueryRunner } from "typeorm";
/**
 * SeedUsers1760246163817:
 * Migracion de carga inicial (semilla) para la tabla user
 * Inserta usuarios de ejemplo en la base de datos con datos basicos
 * Esta migracion permite contar con registros iniciales para pruebas o desarrollo
 */
export class SeedUsers1760246163817 implements MigrationInterface {
/**
* name: Nombre identificador de la migracion
* Usado por TypeORM para el control de versiones de migraciones
*/
    name = 'SeedUsers1760246163817'
/**
 * up:
* Metodo que se ejecuta al aplicar la migracion
* Inserta registros de usuarios en la tabla user
* @param queryRunner: Permite ejecutar comandos SQL dentro de la migracion
*/
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO user (name,age, email, password) VALUES
            ('Valeria',20,'vale@gmail.com','12345'),
            ('Ana',25,'ana@gmail.com','123483'),
            ('Maria',30,'may@yahoo.com','123456')
            `)
    }
/**
* down:
* Metodo que se ejecuta al revertir la migracion
* Elimina los registros insertados por el metodo up, utilizando los correos electronicos para identificar los usuarios creados
* @param queryRunner: Permite ejecutar comandos SQL dentro de la migracion.
*/
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM user WHERE email IN ('vale@gmail.com', 'ana@gmail.com', 'may@yahoo.com')
            `)
    }

}
