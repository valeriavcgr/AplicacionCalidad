import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { loginDTO } from 'src/dto/login.dto';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo:Repository<User>,
        private jwtService:JwtService
    ){}

    async register(data: CreateUserDTO){
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userCreated = this.userRepo.create({...data, password: hashedPassword});
        await this.userRepo.save(userCreated);
        return {message: 'Usuario registrado con exito', user: {id: userCreated.id, email: userCreated.email}}
    }

     async login(data: loginDTO){
        const user = await this.userRepo.findOne({where:{email:data.email}})
        
        if(!user){
            throw new UnauthorizedException("Credenciales invalidas")
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password)
        if(!isPasswordValid){
            throw new UnauthorizedException("Credenciales invalidas")
        }

        const bodyToken = {ing:user.id, name: user.name, email: user.email, role:user.role};
        const token = await this.jwtService.signAsync(bodyToken);
        return {
            accessToken: token
        }
    }
}
