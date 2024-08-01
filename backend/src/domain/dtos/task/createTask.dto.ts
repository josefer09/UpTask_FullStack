


export class CreateTaskDto {
    private constructor(
        public readonly name: string,
        public readonly description: string,
    ) {}

    static create ( props: { [ key: string] :any }): [ string?, CreateTaskDto? ] {
        const {
            name,
            description,
        } = props;

        if( !name ) return ['Missing name'];
        if( !description ) return ['Missin description'];

        return [
            undefined,
            new CreateTaskDto(
                name,
                description,
            )
        ]
    }
}