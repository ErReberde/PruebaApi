import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, Task])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
