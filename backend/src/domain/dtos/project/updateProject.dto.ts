export class UpdateProjectDto {
    private constructor(
        public readonly projectName?: string,
        public readonly clientName?: string,
        public readonly description?: string,
    ) {}

    static create( props: { [key: string]: any}): [string?, UpdateProjectDto?] {
        // Propertiest como variables
        const {
            projectName,
            clientName,
            description
        } = props;

        // No need to check for missing fields, as they are optional in an update
        return [
            undefined,
            new UpdateProjectDto(
                projectName,
                clientName,
                description,
            )
        ]
    }
}
