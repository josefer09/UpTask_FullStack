import { regularExps } from "../../../utils";


export class UpdateUserProfileDto {
    constructor(
        public readonly email: string,
        public readonly name: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, UpdateUserProfileDto?] {
        const { email, name } = object;

        if( !email ) return ['Missing email'];
        if( !name ) return ['Mising name'];
        if( !regularExps.email.test(email)) return ['Email is not valid'];

        return [undefined, new UpdateUserProfileDto(email, name)];
    }
}