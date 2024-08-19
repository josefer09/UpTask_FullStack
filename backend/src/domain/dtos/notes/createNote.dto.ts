import { regularExps } from "../../../utils";



export class CreateNoteDto {
    private constructor(
        public readonly content: string,

    ) {}

    static create (props: {[key: string]: any}): [ string?, CreateNoteDto?] {
        const {
            content,
        } = props;

        if( !content ) return ['Missing content'];

        return [
            undefined,
            new CreateNoteDto(
                content,
            )
        ]
    }
}