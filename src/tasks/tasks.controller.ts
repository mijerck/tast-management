import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksfilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filetrDto: GetTasksfilterDto): Task[] {

        if (Object.keys(filetrDto).length) {
            return this.tasksService.getTasksWithFilterDto(filetrDto)
        } else {
            return this.tasksService.getAllTasks();
        }
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
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTask: CreateTaskDto): Task {
        return this.tasksService.createTask(createTask);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus ): Task {
        return this.tasksService.updateTask(id, status);
    }
}
