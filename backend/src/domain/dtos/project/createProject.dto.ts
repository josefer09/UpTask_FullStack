

export class CreateProjectDto {
    private constructor(
        public readonly projectName: string,
        public readonly clientName: string,
        public readonly description: string,
    ) {}

    static create( props: { [key: string]: any}): [string?, CreateProjectDto?] {
        // Propertiest como variables
        const {
            projectName,
            clientName,
            description
        } = props;

        if( !projectName ) return ['Missing Project Name'];
        if( !clientName ) return ['Missing Client Name'];
        if( !description ) return ['Missing Description'];

        return [
            undefined,
            new CreateProjectDto(
                projectName,
                clientName,
                description,
            )
        ]
    }
}