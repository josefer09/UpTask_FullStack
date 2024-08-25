"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
const Note_1 = __importDefault(require("../../model/Note"));
const utils_1 = require("../../utils");
class NoteService {
    // DI
    constructor() { }
    createNote(createNoteDto, user, task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = new Note_1.default();
                note.content = createNoteDto.content;
                note.createdBy = user.id;
                note.task = task.id;
                task.notes.push(note.id);
                yield Promise.allSettled([task.save(), note.save()]);
                return { msg: 'Note created successfully' };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    getAllNotes(user, task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield Note_1.default.find({ task: task.id });
                return notes;
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
    deleteNote(user, task, noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield Note_1.default.findById(noteId);
                if (!note)
                    throw utils_1.CustomError.notFound('Note not found');
                if (note.createdBy.toString() !== user.id.toString())
                    throw utils_1.CustomError.unauthorized('Action not valid');
                task.notes = task.notes.filter(note => note.toString() !== noteId.toString());
                yield Promise.allSettled([task.save(), note.deleteOne()]);
                return { msg: 'Note deleted' };
            }
            catch (error) {
                console.log(error);
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer('Server Error');
            }
        });
    }
}
exports.NoteService = NoteService;
