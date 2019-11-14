import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }
    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.tasksService.getTaskById(id);
    }

    // TODO: create delete endpoint
    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        return this.tasksService.deleteTask(id);
    }

    @Post()
    createTask(
        @Body() createTask: CreateTaskDto): Task {
        return this.tasksService.createTask(createTask);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string,
        @Body('status') status: TaskStatus ): Task {
        return this.tasksService.updateTask(id, status);
    }
}
