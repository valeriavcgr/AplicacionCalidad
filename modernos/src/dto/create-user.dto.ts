import { IsEmail, IsInt, IsNotEmpty, IsOptional,Min, Max, Length } from "class-validator";

export class CreateUserDTO{
    @IsNotEmpty() 
    name: string;

    @IsOptional() 
    @IsInt() 
    @Min(18, {message: "La edad minima es 18"})
    @Max(100, {message: "Sea realista"})
    age?:number; 

    @IsNotEmpty()
    @IsEmail() 
    email:string; 

    @IsNotEmpty()
    @Length(6,10,{message: "La contraseña debe tener entre 6 y 10 caracteres"})
    password: string
}