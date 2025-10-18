import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import {UpdateProductDTO} from 'src/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesE } from 'src/entities/user.entity';
import { RolesGuard } from '../auth/roles.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}
 
    @Get()
    findAll(){
        return this.productsService.findAll();
    }

    @Get()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(RolesE.ADMIN)
    find(){
        return this.productsService.find();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(RolesE.ADMIN, RolesE.SELLER)
    findOne(@Param('id', ParseIntPipe)id:number){
        return this.productsService.findId(id)
    }

    @Get('name/:name')
    findName(@Param('name')name:string){
        return this.productsService.findName(name)
    }

    @Get('price/:price')
    findPrice(@Param('price', ParseIntPipe)price:number){
        return this.productsService.findPrice(price)
    }

    @Get('stock/:stock')
    findStock(@Param('stock', ParseIntPipe)stock:number){
        return this.productsService.findStock(stock)
    }


    @Post()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(RolesE.ADMIN, RolesE.SELLER)
    create(@Body()body: CreateProductDTO){
        return this.productsService.create(body)
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(RolesE.ADMIN)
    update(@Param('id', ParseIntPipe) id: number, @Body() body:UpdateProductDTO){
    return this.productsService.update(id, body)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(RolesE.ADMIN)
    remove(@Param('id', ParseIntPipe)id:number){
        return this.productsService.remove(id)
    }

}