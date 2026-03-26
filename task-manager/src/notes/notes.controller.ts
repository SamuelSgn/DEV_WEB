import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  private getUserId(req: any) {
    return String(req.user?.sub ?? '');
  }

  @Get()
  findAll(@Req() req: any) {
    return this.notesService.findAllForUser(this.getUserId(req));
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.notesService.findOneForUser(this.getUserId(req), id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateNoteDto) {
    return this.notesService.createForUser(this.getUserId(req), dto);
  }

  @Put(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.notesService.updateForUser(this.getUserId(req), id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.notesService.removeForUser(this.getUserId(req), id);
  }
}
