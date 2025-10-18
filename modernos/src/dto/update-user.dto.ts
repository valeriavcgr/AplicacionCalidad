import { IsNotEmpty, IsOptional } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";
import { RolesE } from "src/entities/user.entity";

export class updateUserDTO extends CreateUserDTO{
    @IsNotEmpty()
    role: RolesE
}