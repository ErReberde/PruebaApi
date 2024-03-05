import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserService } from './login-user.service';
import { LoginUserDto } from 'src/user/dtos/login-user.dto';

@Controller('api/login')
export class LoginUserController {


    constructor(private loginUserService: LoginUserService){}

    @Post()
    loginUser(@Body() loginUser: LoginUserDto){
        return this.loginUserService.loginUser(loginUser)
    }
}
