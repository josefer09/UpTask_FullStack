"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const utils_1 = require("../../utils");
const createNote_dto_1 = require("../../domain/dtos/notes/createNote.dto");
class NoteController {
    // DI
    constructor(service) {
        this.service = service;
        this.handleError = (error, res) => {
            if (error instanceof utils_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            return res.status(500).json({ msg: "Internal Server Error " });
        };
        this.postCreate = (req, res) => {
            const [error, createNoteDto] = createNote_dto_1.CreateNoteDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            const user = req.user;
            const task = req.task;
            this.service.createNote(createNoteDto, user, task)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.getNotes = (req, res) => {
            const user = req.user;
            const task = req.task;
            this.service.getAllNotes(user, task)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.deleteNote = (req, res) => {
            const user = req.user;
            const task = req.task;
            const noteId = req.params.noteId;
            this.service.deleteNote(user, task, noteId)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
    }
}
exports.NoteController = NoteController;
