


export class UpdatePasswordDto {
    constructor(
        public readonly password: string,
        public readonly password_confirmation: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, UpdatePasswordDto?] {
        const { password, password_confirmation } = object;

        if( !password ) return ['Missing password'];
        if( password.length < 6 ) return ['Password too short'];
        if( !password_confirmation ) return ['Missing password confirmation'];
        if( password_confirmation.length < 6 ) return ['Password confirmation too short'];
        if( password ==! password_confirmation ) return ['Password & Password Confirmation not match'];

        return [undefined, new UpdatePasswordDto(password, password_confirmation)];
    }
}