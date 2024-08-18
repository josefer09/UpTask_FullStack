import { regularExps } from "../../../utils";


export class AuthUserEmailDto {
    constructor(
        public readonly email: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, AuthUserEmailDto?] {
        const { email, password } = object;

        if( !email ) return ['Missing email'];
        if ( !regularExps.email.test(email)) return ['Email is not valid'];
        
        return [undefined, new AuthUserEmailDto(email)];
    }
}