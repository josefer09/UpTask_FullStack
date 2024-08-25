"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNoteDto = void 0;
class CreateNoteDto {
    constructor(content) {
        this.content = content;
    }
    static create(props) {
        const { content, } = props;
        if (!content)
            return ['Missing content'];
        return [
            undefined,
            new CreateNoteDto(content)
        ];
    }
}
exports.CreateNoteDto = CreateNoteDto;
