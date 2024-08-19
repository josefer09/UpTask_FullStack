import { CreateNoteDto } from '../../domain/dtos/notes/createNote.dto';
import Note, { INote } from '../../model/Note';
import { ITask } from '../../model/Task';
import { IUser } from '../../model/User';
import { CustomError } from '../../utils';
import { NoteParams } from '../controller/Notes';


export class NoteService {

    // DI

    constructor(){}

    async createNote(createNoteDto: CreateNoteDto, user: IUser, task: ITask) {
        try {
            const note = new Note();
            note.content = createNoteDto.content;
            note.createdBy = user.id;
            note.task = task.id;

            task.notes.push(note.id);

            await Promise.allSettled([task.save(), note.save()]);

            return { msg: 'Note created successfully'};
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer('Server Error');
        }
    }

    async getAllNotes(user: IUser, task: ITask) {
        try {
            const notes = await Note.find({task: task.id});
            return notes;
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer('Server Error');
        }
    }

    async deleteNote(user: IUser, task: ITask, noteId: string) {
        try {
            const note = await Note.findById(noteId);
            if( !note ) throw CustomError.notFound('Note not found');
            if( note.createdBy.toString() !== user.id.toString() ) throw CustomError.unauthorized('Action not valid');

            task.notes = task.notes.filter( note => note.toString() !== noteId.toString() );

            await Promise.allSettled([task.save(), note.deleteOne()]);
            return { msg: 'Note deleted'};
        } catch (error) {
            console.log(error);
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer('Server Error');
        }
    }
}