import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreatTaskDto } from './dtos/create-task.dto';
import { UpdateTaskStatusDto } from './dtos/update-task-status.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/task')
export class TaskController {
    constructor(private taskService: TaskService){}

    @Post()
    @ApiBearerAuth("BearerToken")
    createNewTask(@Body() task: CreatTaskDto){
        return this.taskService.createNewTask(task)
    }

    @Get()
    @ApiBearerAuth("BearerToken")
    listMyTask(@Body("idUser") idUser: number){
        return this.taskService.getTasksByIdUser(idUser)
    }

    @Delete(":idTask")
    @ApiBearerAuth("BearerToken")
    deleteTaskById(@Param("idTask") idTask: number){
        return this.taskService.deleteNewTask(idTask)
    }

    @Post("/changeStatus/:idTask")
    @ApiBearerAuth("BearerToken")
    changeStatusTask(@Body() task: UpdateTaskStatusDto, @Param("idTask") idTask: number){
        return this.taskService.changeStateTask(task, idTask)
    }
}
