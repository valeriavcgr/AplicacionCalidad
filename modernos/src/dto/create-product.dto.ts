import { Type } from "class-transformer";
import {IsInt, IsNotEmpty, MaxLength } from "class-validator";

export class CreateProductDTO{
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsInt()
    price:number

    @IsNotEmpty()
    @IsInt()
    stock:number

    @IsNotEmpty()
    @MaxLength(100)
    description:string

    @IsNotEmpty()
    @Type(() => Object)
    category?: {
    id: number;
    }

}