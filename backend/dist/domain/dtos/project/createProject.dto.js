"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectDto = void 0;
class CreateProjectDto {
    constructor(projectName, clientName, description) {
        this.projectName = projectName;
        this.clientName = clientName;
        this.description = description;
    }
    static create(props) {
        // Propertiest como variables
        const { projectName, clientName, description } = props;
        if (!projectName)
            return ['Missing Project Name'];
        if (!clientName)
            return ['Missing Client Name'];
        if (!description)
            return ['Missing Description'];
        return [
            undefined,
            new CreateProjectDto(projectName, clientName, description)
        ];
    }
}
exports.CreateProjectDto = CreateProjectDto;
