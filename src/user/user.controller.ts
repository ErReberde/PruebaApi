import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    createUser(@Body() user: CreateUserDto){
        return this.userService.createNewUser(user)
    }

    @Get()
    @ApiBearerAuth("BearerToken")
    listAllUser(@Body() idUser: any){
        return this.userService.getAllUsers(idUser)
    }
}

