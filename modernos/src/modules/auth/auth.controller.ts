import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from 'src/dto/login.dto';
import { CreateUserDTO } from 'src/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    regisyer(@Body()data: CreateUserDTO){
        return this.authService.register(data);
    }

    @Post('login')
    login(@Body() data:loginDTO){
        return this.authService.login(data);
    }

 @Get('profile')
    getprofile(@Request()info){
        return info.user
    }
}
