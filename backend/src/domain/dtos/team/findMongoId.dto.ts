import { regularExps } from "../../../utils";


export class FindMongoIdDto {
    constructor(
        public readonly id: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, FindMongoIdDto?] {
        const { id, password } = object;

        if( !id ) return ['Missing id'];
        if ( !regularExps.mongoId.test(id)) return ['id is not valid'];
        
        return [undefined, new FindMongoIdDto(id)];
    }
}