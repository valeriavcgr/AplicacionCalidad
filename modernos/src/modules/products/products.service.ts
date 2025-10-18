import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
constructor(
    @InjectRepository(Product)
    private productRepo:Repository<Product>,
    @InjectRepository(Category)
    private categoryRepo:Repository<Category>
){}

    private ifDontExists(product: Product | null): Product{ 
        if(!product) throw new NotFoundException("Ese producto no existe")
        return product
    }

    findAll() {
        return this.productRepo.find({where:{status: true}});
    }

    find(){
        return this.productRepo.find()
    }

   async findId(id:number){
        const idFind = await this.productRepo.findOneBy({id})
            return this.ifDontExists(idFind)
    }

    async findName(name:string){
        const nameFind = await this.productRepo.findOneBy({name})
            return this.ifDontExists(nameFind)
    }
    async findPrice(price:number){
        const priceFind = await this.productRepo.findOneBy({price})
            return this.ifDontExists(priceFind)
    }

    async findStock(stock:number){
        const stockFind = await this.productRepo.findOneBy({stock})
            return this.ifDontExists(stockFind)
    }

    create(newProduct: CreateProductDTO){
        const productCreated= this.productRepo.create(newProduct)
        return this.productRepo.save(productCreated)
    }

    async update(id:number, updateProduct: UpdateProductDTO){
        await this.productRepo.update(id, updateProduct)
        return this.findId(id)
    }

    async remove(id:number){
        const productFind = this.ifDontExists(await this.productRepo.findOneBy({id}))
        productFind.status = false 
        await this.productRepo.save(productFind)
        return (`El producto con id ${id} fue desactivado`); 
    }
}
