import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
constructor(
    @InjectRepository(Product)
    private productRepo:Repository<Product>,
    @InjectRepository(Category)
    readonly categoryRepo:Repository<Category>
){}

    private ifDontExists(product: Product | null): Product{ 
        if(!product) throw new NotFoundException("Ese producto no existe")
        return product
    }

    findAll() {
        return this.productRepo.find({relations: ['category']});
    }

    async findName(name:string){
        return this.productRepo.find({where: { 
            name: Like(`%${name}%`) },
            relations: ['category'],
        });
    }

   async findId(id:number){
        const idFind = await this.productRepo.findOneBy({id})
            return this.ifDontExists(idFind)
    }

    async findPrice(price:number){
        const priceFind = await this.productRepo.findOneBy({price})
            return this.ifDontExists(priceFind)
    }

    async findStock(stock:number){
        const stockFind = await this.productRepo.findOneBy({stock})
            return this.ifDontExists(stockFind)
    }

async create(newProduct: CreateProductDTO & { category?: { id: number } }) {
  //  Buscar la categoría si viene incluida
  let category: Category | null = null;

  if (newProduct.category?.id) {
    category = await this.categoryRepo.findOneBy({ id: newProduct.category.id });
    if (!category) {
      throw new NotFoundException(`Categoría con id ${newProduct.category.id} no existe`);
    }
  }

  //  Crear el producto con la categoría encontrada (si existe)
  const productCreated = this.productRepo.create({
    ...newProduct,
    category: category ?? undefined, // 👈 se pasa el objeto Category, no el ID
  });

  //  Guardar en la base de datos
  return this.productRepo.save(productCreated);
}


async update(id: number, updateProduct: Partial<CreateProductDTO & { category?: { id: number } }>) {
  // 1) buscar el producto o lanzar NotFound
const product = this.ifDontExists(await this.productRepo.findOne({ where: { id }, relations: ['category'] })) as Product;
  // 2) asignar campos simples si vienen
  if (updateProduct.name !== undefined) product.name = updateProduct.name;
  if (updateProduct.price !== undefined) product.price = updateProduct.price;
  if (updateProduct.stock !== undefined) product.stock = updateProduct.stock;
  if (updateProduct.description !== undefined) product.description = updateProduct.description;

  // 3) manejar la categoría (si vienen)
  if (updateProduct.category && typeof updateProduct.category.id === 'number') {
    const cat = await this.categoryRepo.findOneBy({ id: updateProduct.category.id });
    if (!cat) throw new NotFoundException(`Categoría con id ${updateProduct.category.id} no existe`);
    product.category = cat;
  }

  // 4) guardar y devolver
  return this.productRepo.save(product);
}


    async remove(id:number){
        const deleteProduct = await this.productRepo.delete(id)
        if(deleteProduct.affected === 0) throw new NotFoundException('Producto no encontrado')
        return {message: `Producto con id ${id} se ha eliminado correctamente`};
    }
}
