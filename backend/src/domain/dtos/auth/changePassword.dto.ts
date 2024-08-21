


export class ChangePasswordDto {
    constructor(
        public readonly current_password: string,
        public readonly password: string,
        public readonly password_confirmation: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, ChangePasswordDto?] {
        const { current_password, password, password_confirmation } = object;
        
        if( !current_password ) return ['Missing password'];
        if( current_password.length < 6 ) return ['Password too short'];
        
        if( !password ) return ['Missing password'];
        if( password.length < 6 ) return ['Password too short'];
        
        if( password !== password_confirmation ) return ['Password & Password Confirmation not match'];

        if( !password_confirmation ) return ['Missing password confirmation'];
        if( password_confirmation.length < 6 ) return ['Password confirmation too short'];


        return [undefined, new ChangePasswordDto(current_password, password, password_confirmation)];
    }
}