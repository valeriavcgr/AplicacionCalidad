import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO } from 'src/dto/create-category.dto';
import { UpdateCategoryDTO } from 'src/dto/update-category.dto';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepo:Repository<Category>
    ){}

    findAllCategory(){
        return this.categoryRepo.find();
    }

    async findCategoryById(id:number){
        const idCategory = await this.categoryRepo.findOneBy({id})
        if (!idCategory) throw new NotFoundException('Categoria no encontrada')
        return idCategory
    }
    async findCategoryByName(name:string){
        const nameCategory = await this.categoryRepo.findOneBy({name})
        if (!nameCategory) throw new NotFoundException('Categoria no encontrada')
            return nameCategory
    }

    createCategory(newCategory:CreateCategoryDTO){
        const categoryCreated = this.categoryRepo.create(newCategory)
        return this.categoryRepo.save(categoryCreated)
    }

    async updateCategory(id:number, updateCategory: UpdateCategoryDTO){
        await this.categoryRepo.update(id, updateCategory)
        return this.findCategoryById(id)
    }
    
    async removeCategory(id:number){
        const resultCategory = await this.categoryRepo.delete({id})
        if (resultCategory.affected === 0) throw new NotFoundException(`Categoria con id ${id} no encontrada`)
        return {message:`La categoria con id ${id} fue eliminada correctamente`}
    }
}

    