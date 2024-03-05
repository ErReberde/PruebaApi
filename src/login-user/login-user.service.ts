import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword, generateTokenForUser } from 'src/functions/loginsUtilsFunction';
import { LoginUserDto } from 'src/user/dtos/login-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginUserService {
    
    constructor(@InjectRepository(User) private loginUserRepository: Repository<User>){}


    async loginUser(user: LoginUserDto){

        try{

            const foundUserByUsername = await this.loginUserRepository.findOne({where:{
                email: user.email
            }})

            if(!foundUserByUsername) throw new HttpException("Usuario o Contraseña incorrectos", HttpStatus.UNAUTHORIZED)

            const passwordCorrect = await comparePassword(user?.password, foundUserByUsername?.password)

            if(passwordCorrect) {

                let newToken = generateTokenForUser(foundUserByUsername)

                return {
                    message: "Login correcto",
                    status: 200,
                    token: newToken,
                    userData: foundUserByUsername
                }
            }
        }catch(e){
            console.log(e)
        }
    }
}
