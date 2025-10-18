import { MigrationInterface, QueryRunner } from "typeorm";
/**
 * SeedProducts1760247652866:
 * Migracion de carga inicial (semilla) para la tabla product
 * Inserta productos de ejemplo
 */
export class SeedProducts1760247652866 implements MigrationInterface {
/**
* name: Nombre identificador de la migracion
* Utilizado por TypeORM para el control de versiones de migraciones
*/
    name = 'SeedProducts1760247652866'
/**
* up:
* Metodo que se ejecuta al aplicar la migracion
* Inserta registros de productos en la tabla product
* @param queryRunner: Permite ejecutar comandos SQL dentro de la migracion
*/
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO product (name,price,stock,status, description) VALUES
            ('samsung galaxy a26 256gb 5g',2000000,5,1,'celu samsung'),
            ('celular iphone 16 plus 128gb 5g',1500000,10,1,'celu iphone'),
            ('xiaomi redmi note 14 256gb 5g',3000000,15,1,'celu xiaomi')
            `)
    }
/**
* down:
* Metodo que se ejecuta al revertir la migracion
* Elimina los registros insertados por el metodo up, utilizando el campo stock para identificar los productos creados
* @param queryRunner: Permite ejecutar comandos SQL dentro de la migracion
*/
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM product WHERE stock IN (5, 10, 15)
            `)
    }

}
