import { regularExps } from "../../../utils";


export class FindEmailDto {
    constructor(
        public readonly email: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, FindEmailDto?] {
        const { email, password } = object;

        if( !email ) return ['Missing email'];
        if ( !regularExps.email.test(email)) return ['Email is not valid'];
        
        return [undefined, new FindEmailDto(email)];
    }
}