"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectDto = void 0;
class UpdateProjectDto {
    constructor(projectName, clientName, description) {
        this.projectName = projectName;
        this.clientName = clientName;
        this.description = description;
    }
    static create(props) {
        // Propertiest como variables
        const { projectName, clientName, description } = props;
        // No need to check for missing fields, as they are optional in an update
        return [
            undefined,
            new UpdateProjectDto(projectName, clientName, description)
        ];
    }
}
exports.UpdateProjectDto = UpdateProjectDto;
