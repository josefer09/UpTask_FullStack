import { Request, Response } from "express";
import { CustomError } from "../../utils";
import { NoteService } from "../service/Note";
import { CreateNoteDto } from '../../domain/dtos/notes/createNote.dto';
import { INote } from "../../model/Note";
import { Types } from "mongoose";


export type NoteParams = {
    noteId: Types.ObjectId;
}

export class NoteController {

    // DI
    constructor(private readonly service: NoteService){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message });
          }
      
          console.log(error);
          return res.status(500).json({ msg: "Internal Server Error " });
    }

    postCreate = (req: Request<{}, {}, INote>, res: Response) => {
        const [error, createNoteDto] = CreateNoteDto.create(req.body);
        if( error ) return res.status(400).json({ error });

        const user = req.user;
        const task = req.task;

        this.service.createNote(createNoteDto!, user!, task)
        .then( response => res.json(response) )
        .catch( error => this.handleError( error, res ));
    }

    getNotes = (req: Request, res: Response) => {
        const user = req.user;
        const task = req.task;

        this.service.getAllNotes(user!, task)
        .then( response => res.json(response) )
        .catch( error => this.handleError( error, res ));
    }

    deleteNote = (req: Request, res: Response) => {
        const user = req.user;
        const task = req.task;
        const noteId = req.params.noteId;

        this.service.deleteNote(user!, task, noteId)
        .then( response => res.json(response) )
        .catch( error => this.handleError( error, res ));
    }

}