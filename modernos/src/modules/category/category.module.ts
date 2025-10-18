import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { UsersModule } from '../users/users.module';

@Module({
    imports:[
      TypeOrmModule.forFeature([Product, Category]),
      UsersModule
  ],
  exports: [
  TypeOrmModule.forFeature([Product]),
  TypeOrmModule.forFeature([Category]),
 
],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
