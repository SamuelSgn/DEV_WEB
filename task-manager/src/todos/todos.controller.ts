import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  private getUserId(req: any) {
    return String(req.user?.sub ?? '');
  }

  @Get()
  listAll() {
    return this.todosService.listAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findAny(id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateTodoDto) {
    return this.todosService.createForUser(this.getUserId(req), dto);
  }

  @Put(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todosService.updateForUser(this.getUserId(req), id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.todosService.removeForUser(this.getUserId(req), id);
  }
}

