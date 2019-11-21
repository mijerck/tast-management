import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
