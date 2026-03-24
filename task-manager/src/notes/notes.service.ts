import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
    private notes: any[] = [];

    getAllNotes() {
        return this.notes;
    }

    createNote(note: CreateNoteDto) {
        const created = {
            id: String(Date.now()),
            title: note.title,
            content: note.content,
            createdAt: new Date(),
        };
        this.notes.unshift(created);
        return created;
    }
}
