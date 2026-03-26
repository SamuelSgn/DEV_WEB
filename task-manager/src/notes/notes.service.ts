import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

function parseBigInt(value: string) {
  try {
    return BigInt(value);
  } catch {
    return null;
  }
}

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  private serializeNote(note: any) {
    return {
      id: note.id.toString(),
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      userId: note.userId.toString(),
    };
  }

  async findAllForUser(userId: string) {
    const uid = parseBigInt(userId);
    if (uid === null) throw new BadRequestException('Invalid user');

    const notes = await this.prisma.note.findMany({
      where: { userId: uid },
      orderBy: { createdAt: 'desc' },
    });
    return notes.map((n) => this.serializeNote(n));
  }

  async findOneForUser(userId: string, noteId: string) {
    const uid = parseBigInt(userId);
    const nid = parseBigInt(noteId);
    if (uid === null || nid === null) throw new BadRequestException('Invalid id');

    const note = await this.prisma.note.findFirst({
      where: { userId: uid, id: nid },
    });
    if (!note) throw new NotFoundException('Note not found');
    return this.serializeNote(note);
  }

  async createForUser(userId: string, dto: CreateNoteDto) {
    const uid = parseBigInt(userId);
    if (uid === null) throw new BadRequestException('Invalid user');

    const note = await this.prisma.note.create({
      data: {
        title: dto.title,
        content: dto.content ?? '',
        userId: uid,
      },
    });
    return this.serializeNote(note);
  }

  async updateForUser(userId: string, noteId: string, dto: UpdateNoteDto) {
    const uid = parseBigInt(userId);
    const nid = parseBigInt(noteId);
    if (uid === null || nid === null) throw new BadRequestException('Invalid id');

    const existing = await this.prisma.note.findFirst({
      where: { userId: uid, id: nid },
    });
    if (!existing) throw new NotFoundException('Note not found');

    const data: Record<string, unknown> = {};
    if (typeof dto.title !== 'undefined') data.title = dto.title;
    if (typeof dto.content !== 'undefined') data.content = dto.content ?? '';

    const updated = await this.prisma.note.update({
      where: { id: nid },
      data,
    });
    return this.serializeNote(updated);
  }

  async removeForUser(userId: string, noteId: string) {
    const uid = parseBigInt(userId);
    const nid = parseBigInt(noteId);
    if (uid === null || nid === null) throw new BadRequestException('Invalid id');

    const existing = await this.prisma.note.findFirst({
      where: { userId: uid, id: nid },
    });
    if (!existing) throw new NotFoundException('Note not found');

    await this.prisma.note.delete({ where: { id: nid } });
    return { deleted: true };
  }
}
