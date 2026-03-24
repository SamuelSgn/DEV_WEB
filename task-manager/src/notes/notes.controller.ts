import { Body, Controller, Get, Post } from '@nestjs/common';
import {NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Get()
    getAllNotes() {
        return this.notesService.getAllNotes();
    }

    @Post()
    createNote(@Body() note: CreateNoteDto) {
        return this.notesService.createNote(note);
    }
}
