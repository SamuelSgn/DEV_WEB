import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { UserTodosController } from './user-todos.controller';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController, UserTodosController],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}

