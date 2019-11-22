import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksfilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {}

    /**
     * Get all tasks with filter applied
     * @param filetrDto
     * @returns a promise of tasks
     */
    @Get()
    getTasks(@Query(ValidationPipe) filetrDto: GetTasksfilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filetrDto);
    }

    /**
     * Get task by an ID
     * @param id
     * @returns a promise of Task
     */
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    // TODO: create delete endpoint
    /**
     * Delete task by an id
     * @param id
     * @returns deleted task
     */
    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id);
    }

    /**
     * Create task with post
     * @param createTask dto
     * @returns created task
     */
    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTask: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTask);
    }

    /**
     * Update the task by an ID
     * @param id
     * @param status
     * @returns updated task
     */
    @Patch('/:id/status')
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus ): Promise<Task> {
        return this.tasksService.updateTask(id, status);
    }
}
