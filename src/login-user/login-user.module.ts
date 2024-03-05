import { Module } from '@nestjs/common';
import { LoginUserService } from './login-user.service';
import { LoginUserController } from './login-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [LoginUserService],
  controllers: [LoginUserController]
})
export class LoginUserModule {}
