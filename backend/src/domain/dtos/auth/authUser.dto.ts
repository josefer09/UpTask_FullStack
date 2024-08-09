import { regularExps } from "../../../utils";


export class AuthUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, AuthUserDto?] {
        const { email, password } = object;

        if( !email ) return ['Missing email'];
        if ( !regularExps.email.test(email)) return ['Email is not valid'];
        if( !password ) return ['Missing password'];
        
        return [undefined, new AuthUserDto(email, password)];
    }
}