import { Body, Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from 'src/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get('register')
    @Render('register')
    getregister(){
        return { title: 'Register' };
    }


    @Get('login')
    @Render('login')
    getlogin(){
        return { title: 'Login' };
    }

}
