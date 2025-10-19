import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Render, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from 'src/dto/create-category.dto';
import { UpdateCategoryDTO } from 'src/dto/update-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}


    @Get('marcas')
    @Render('category/marcas')
    async getcelulares(){
        const category = await this.categoryService.findAllCategory();
        return {title: 'marcas', category};
    }
    @Get('name/:name')
    async name(@Param('name') name: string) {
    return this.categoryService.findCategoryByName(name);
}

    //backend
    @Get()
    findAllCategory(){
        return this.categoryService.findAllCategory();
    }

    @Get(':id')
    findCategoryByID(@Param('id', ParseIntPipe)id:number){
        return this.categoryService.findCategoryById(id)
    }
    
    @Get('name/:name')
    findCategoryByName(@Param('name')name:string){
        return this.categoryService.findCategoryByName(name)
    }

    @Post()
    createCategory(@Body()body:CreateCategoryDTO){
        return this.categoryService.createCategory(body)
    }

    @Put(':id')
    updateCategory(@Param('id', ParseIntPipe)id:number, @Body()body:UpdateCategoryDTO){
        return this.categoryService.updateCategory(id, body)

    }

    @Delete(':id')
        removeCategory(@Param('id', ParseIntPipe)id:number){
            return this.categoryService.removeCategory(id)
        }
}
