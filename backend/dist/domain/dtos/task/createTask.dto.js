"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskDto = void 0;
class CreateTaskDto {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    static create(props) {
        const { name, description, } = props;
        if (!name)
            return ['Missing name'];
        if (!description)
            return ['Missin description'];
        return [
            undefined,
            new CreateTaskDto(name, description)
        ];
    }
}
exports.CreateTaskDto = CreateTaskDto;
