/*
 * Configuración principal de typeorm
 * Se encarga de establecer la conexion con la base de datos
 * Se definen las entidades y migraciones que usara la aplicacion
 */
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity';
import { Product } from './src/entities/product.entity';
import { Category } from './src/entities/category.entity';
/**
* Carga las variables de entorno definidas en el archivo .env
 * Asi son utilizarlas dentro de esta configuracion
 */
dotenv.config()
export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities:[User, Product, Category],
    migrations: ['./src/migrations/*.ts'],
});
