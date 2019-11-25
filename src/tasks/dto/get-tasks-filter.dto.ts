import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class GetTasksfilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
