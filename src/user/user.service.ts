import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles, User } from './user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dtos/login-user.dto';
import { comparePassword, generatePasswordWithSalt, generateTokenForUser } from 'src/functions/loginsUtilsFunction';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async createNewUser(user: CreateUserDto){

        try{

            const newUser =  this.userRepository.create({
                userName: user.userName,
                email: user.email,
                password: generatePasswordWithSalt(user.password)
            })

            return this.userRepository.save(newUser)

        }catch(e){
            return e
        }
    }

    async getAllUsers(user: User){

        
        try{

            if (user.role === Roles.ADMIN){

                return this.userRepository.find()
            }

            throw new HttpException("No tiene autorización para solicitar esto", HttpStatus.UNAUTHORIZED)
        }catch(e){
            return e
        }
    }
}
