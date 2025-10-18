import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from 'src/dto/create-category.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UpdateCategoryDTO } from 'src/dto/update-category.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesE } from 'src/entities/user.entity';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    findAllCategory(){
        return this.categoryService.findAllCategory();
    }

    @Get(':id')
    @UseGuards( JwtAuthGuard,RolesGuard)
    @Roles(RolesE.ADMIN, RolesE.SELLER)
    findCategoryByID(@Param('id', ParseIntPipe)id:number){
        return this.categoryService.findCategoryById(id)
    }
    
    @Get('name/:name')
    findCategoryByName(@Param('name')name:string){
        return this.categoryService.findCategoryByName(name)
    }

    @Post()
    @UseGuards( JwtAuthGuard,RolesGuard)
    @Roles(RolesE.ADMIN, RolesE.SELLER)
    createCategory(@Body()body:CreateCategoryDTO){
        return this.categoryService.createCategory(body)
    }

    @Put(':id')
    @UseGuards( JwtAuthGuard,RolesGuard)
    @Roles(RolesE.ADMIN)
    updateCategory(@Param('id', ParseIntPipe)id:number, @Body()body:UpdateCategoryDTO){
        return this.categoryService.updateCategory(id, body)

    }

    @Delete(':id')
    @UseGuards( JwtAuthGuard,RolesGuard)
    @Roles(RolesE.ADMIN)
        removeCategory(@Param('id', ParseIntPipe)id:number){
            return this.categoryService.removeCategory(id)
        }
}
