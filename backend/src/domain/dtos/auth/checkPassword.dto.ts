

export class CheckPasswordDto {
    constructor(
        public readonly password: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, CheckPasswordDto?] {
        const { password } = object;

        if( !password ) return ['Missing password'];
        if( password.length < 6 ) return ['Password too short'];

        return [undefined, new CheckPasswordDto(password)];
    }
}