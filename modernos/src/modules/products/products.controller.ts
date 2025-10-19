import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Render, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import {UpdateProductDTO} from 'src/dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}
 

    @Get('dashboard')
    @Render('products/dashboard')
    async getdashboard(){
        const products = await this.productsService.findAll();
        return {title: 'dashboard', products};
    }
    @Get('celulares')
    @Render('products/celulares')
    async getcelulares(){
        const products = await this.productsService.findAll();
        return {title: 'celulares', products};
    }

    @Get('name/:name')
    async name(@Param('name') name: string) {
    return this.productsService.findName(name);
}

// backend
    @Get()
    findAll(){
        return this.productsService.findAll();
    }

    @Get(':id')
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
    create(@Body()body: CreateProductDTO){
        return this.productsService.create(body)
    }


    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body:UpdateProductDTO){
    return this.productsService.update(id, body)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe)id:number){
        return this.productsService.remove(id)
    }

}