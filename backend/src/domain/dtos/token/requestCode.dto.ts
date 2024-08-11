import { regularExps } from "../../../utils";


export class RequestCode {
    constructor(
        public readonly email: string,
    ) {}

    static validate(object: {[key: string]: any}): [string?, RequestCode?] {
        const { email } = object;

        if( !email ) return ['Missing email'];
        if ( !regularExps.email.test(email) ) return ['Email is not valid'];

        return [undefined, new RequestCode(email)];
    }

    
}
