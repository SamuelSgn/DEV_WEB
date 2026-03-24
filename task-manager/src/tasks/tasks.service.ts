import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    // Legacy controller kept only to avoid breaking older routes.
    // The real implementation is in `/todos` with authentication.
    return {
      message: 'Use /todos API (authenticated)',
      payload: createTaskDto,
    };
  }

  findAll() {
    return [];
  }

  findOne(id: string) {
    return { id };
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return { id, ...updateTaskDto };
  }

  remove(id: string) {
    return { id, deleted: true };
  }
}
