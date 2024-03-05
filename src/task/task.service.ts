import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estados, Task } from './task.entity';
import { Repository } from 'typeorm';
import {CreatTaskDto } from './dtos/create-task.dto';
import { User } from 'src/user/user.entity';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';

@Injectable()
export class TaskService {
    
    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>,
        @InjectRepository(User) private userRepository: Repository<User>
    ){}


    async createNewTask(task: CreatTaskDto){
        const newTask =this.taskRepository.create({
            name: task.name,
            user: await this.userRepository.findOne({where: {
                id: task.userId
            }})
        })

        return this.taskRepository.save(newTask)

    }

    async deleteNewTask(idTask: number){
        return await this.taskRepository.delete({id: idTask})
    }

    async getTasksByIdUser(userId: number){
        return await this.taskRepository.find({
            where:{
                user: await this.userRepository.find({where: {id : userId}})
            }
        })
    }
    async changeStateTask(updateTask: UpdateTaskStatusDto, idTask: number){
        console.log(updateTask)
        return await this.taskRepository.update({id: idTask}, {
            state: updateTask.state
        })

    }
}
