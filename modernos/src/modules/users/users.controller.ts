import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { updateUserDTO } from 'src/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesE } from 'src/entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    @Roles(RolesE.ADMIN)
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    @Roles(RolesE.ADMIN, RolesE.SELLER)
        findOne(@Param('id', ParseIntPipe)id:number){
            return this.userService.findOne(id)
        }

    @Post()
    @Roles(RolesE.ADMIN)
    create(@Body()body: CreateUserDTO){
        return this.userService.create(body)
    }

    @Put(':id')
    @Roles(RolesE.ADMIN)
    update(@Param('id', ParseIntPipe) id: number, @Body() body:updateUserDTO){
    return this.userService.update(id, body)
    }
    
    @Delete(':id')
    @Roles(RolesE.ADMIN)
    remove(@Param('id', ParseIntPipe)id:number){
        return this.userService.remove(id)
    }
}
