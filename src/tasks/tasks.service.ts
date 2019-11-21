import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { threadId } from 'worker_threads';
import { GetTasksfilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilterDto (filterDto: GetTasksfilterDto): Task[] {
    //     const { status, search} = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task =>  task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter( task => 
    //             task.title.includes(search) ||
    //             task.description.includes(search),
    //             );
    //     }
    //     return tasks;
    // }
    
    /**
     * @param id,
     * @returns promise of Task
     */
    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
    }

    // // TODO(mzanda): createa a delete service methode
    // deleteTask(id: string) {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        await task.save();

        return task;

    }
    // /**
    //  * @param createTaskDto
    //  * return @title and @description
    //  * aftr destructing
    //  */
    // createTask(createTaskDto: CreateTaskDto): Task {

    //     const { title, description } = createTaskDto;

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);

    //     return task;
    // }

    // updateTask(id: string, status: TaskStatus) {
    //     const task = this.getTaskById(id);

    //     task.status = status;
    //     return task;
    // }

}
