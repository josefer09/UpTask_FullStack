

export class ValidateToken {
    constructor(
        public readonly token: string,
    ) {}

    static validate(object: {[key: string]: any}): [string?, ValidateToken?] {
        const { token } = object;

        if( !token ) return ['Missing Token'];

        return [undefined, new ValidateToken(token)];
    }

    
}
