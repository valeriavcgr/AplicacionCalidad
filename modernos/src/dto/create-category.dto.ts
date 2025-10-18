import { IsNotEmpty, MinLength } from "class-validator";

export class CreateCategoryDTO{

        @IsNotEmpty()
        name: string;
    
        @IsNotEmpty()
        @MinLength(10)
        description: string;
}