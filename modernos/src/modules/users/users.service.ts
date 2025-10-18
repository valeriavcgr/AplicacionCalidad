import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { updateUserDTO } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)
    private userRepo:Repository<User>,
    ){}

    findAll(){ 
        return this.userRepo.find(); 
    }

    async findOne(id:number){ 
        const userFind = await this.userRepo.findOneBy({id})
        if(!userFind)throw new NotFoundException('Usuario no encontrado')
        return userFind
    }

    create(newUser:CreateUserDTO){
        const userCreated= this.userRepo.create(newUser)
        return this.userRepo.save(userCreated)
    }

    async update(id:number, updateUser:updateUserDTO){
        const hashedPassword = await bcrypt.hash(updateUser.password, 10)
       await this.userRepo.update(id,{... updateUser, password:hashedPassword})
        return this.findOne(id)
    }

    async remove(id:number){
        const deleteUser = await this.userRepo.delete(id)
        if(deleteUser.affected === 0) throw new NotFoundException('Usuario no encontrado')
        return {message: `Usuario con id ${id} se ha eliminado correctamente`};
    }
}
