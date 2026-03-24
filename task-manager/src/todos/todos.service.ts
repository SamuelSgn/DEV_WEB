import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

function parseBigInt(value: string) {
  try {
    return BigInt(value);
  } catch {
    return null;
  }
}

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  private serializeTodo(todo: any) {
    return {
      id: todo.id.toString(),
      title: todo.title,
      description: todo.description,
      createdAt: todo.createdAt,
      dueTime: todo.dueTime,
      status: todo.status,
      userId: todo.userId.toString(),
    };
  }

  async listForUser(userId: string) {
    const id = parseBigInt(userId);
    if (id === null) throw new BadRequestException('Invalid user');

    const todos = await this.prisma.todo.findMany({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },
    });
    return todos.map((t) => this.serializeTodo(t));
  }

  async listAll() {
    const todos = await this.prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return todos.map((t) => this.serializeTodo(t));
  }

  async findAny(todoId: string) {
    const tid = parseBigInt(todoId);
    if (tid === null) throw new BadRequestException('Invalid id');

    const todo = await this.prisma.todo.findUnique({ where: { id: tid } });
    if (!todo) throw new NotFoundException('Todo not found');
    return this.serializeTodo(todo);
  }

  async findForUser(userId: string, todoId: string) {
    const uid = parseBigInt(userId);
    const tid = parseBigInt(todoId);
    if (uid === null || tid === null) throw new BadRequestException('Invalid id');

    const todo = await this.prisma.todo.findFirst({ where: { userId: uid, id: tid } });
    if (!todo) throw new NotFoundException('Todo not found');
    return this.serializeTodo(todo);
  }

  async createForUser(userId: string, dto: CreateTodoDto) {
    const uid = parseBigInt(userId);
    if (uid === null) throw new BadRequestException('Invalid user');

    const dueTime = new Date(dto.dueTime);
    if (Number.isNaN(dueTime.getTime())) throw new BadRequestException('Invalid dueTime');

    const status = dto.status?.trim() ? dto.status.trim() : 'pending';

    const todo = await this.prisma.todo.create({
      data: {
        title: dto.title,
        description: dto.description ?? '',
        dueTime,
        status,
        userId: uid,
      },
    });

    return this.serializeTodo(todo);
  }

  async updateForUser(userId: string, todoId: string, dto: UpdateTodoDto) {
    const uid = parseBigInt(userId);
    const tid = parseBigInt(todoId);
    if (uid === null || tid === null) throw new BadRequestException('Invalid id');

    const existing = await this.prisma.todo.findFirst({ where: { userId: uid, id: tid } });
    if (!existing) throw new NotFoundException('Todo not found');

    const data: Record<string, unknown> = {};
    if (typeof dto.title !== 'undefined') data.title = dto.title;
    if (typeof dto.description !== 'undefined') data.description = dto.description ?? '';
    if (typeof dto.status !== 'undefined') data.status = dto.status?.trim() ? dto.status.trim() : existing.status;
    if (typeof dto.dueTime !== 'undefined') data.dueTime = new Date(dto.dueTime);

    if (data.dueTime && Number.isNaN((data.dueTime as Date).getTime())) {
      throw new BadRequestException('Invalid dueTime');
    }

    const updated = await this.prisma.todo.update({ where: { id: tid }, data });
    return this.serializeTodo(updated);
  }

  async removeForUser(userId: string, todoId: string) {
    const uid = parseBigInt(userId);
    const tid = parseBigInt(todoId);
    if (uid === null || tid === null) throw new BadRequestException('Invalid id');

    const existing = await this.prisma.todo.findFirst({ where: { userId: uid, id: tid } });
    if (!existing) throw new NotFoundException('Todo not found');

    await this.prisma.todo.delete({ where: { id: tid } });
    return { deleted: true };
  }
}

