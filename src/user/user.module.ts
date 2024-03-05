import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Task } from 'src/task/task.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Task])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
