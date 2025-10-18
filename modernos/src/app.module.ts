import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';    
import { TypeOrmModule } from '@nestjs/typeorm';        
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
@Module({
  imports: [
  ConfigModule.forRoot({isGlobal: true}),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'mysql',
      host: config.get<string>('DB_HOST'),
      port: config.get<number>('DB_PORT'),
      username: config.get<string>('DB_USERNAME'),
      password: config.get<string>('DB_PASSWORD'),
      database: config.get<string>('DB_NAME'),
      autoLoadEntities: true,
      synchronize: false,
    }),
  }),
  UsersModule,
  ProductsModule, 
  AuthModule, 
  CategoryModule
],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}
// aqui llamamos al modulo de users para que lo reconozca el app y el main 