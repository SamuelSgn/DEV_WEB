import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodosService } from './todos.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserTodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('todos')
  listMyTodos(@Req() req: any) {
    return this.todosService.listForUser(String(req.user?.sub ?? ''));
  }
}

