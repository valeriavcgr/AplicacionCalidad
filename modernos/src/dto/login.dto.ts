import { IsEmail, MinLength, MaxLength } from "class-validator";

export class loginDTO{
    @IsEmail()
    email: string;


    @MinLength(6)
    @MaxLength(10)
    password: string;

}