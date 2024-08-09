import { regularExps } from "../../../utils/regular-exp";
import { CreateProjectDto } from "../project/createProject.dto";

export class CreateUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly name: string,
        public readonly confirmed: boolean,
        public readonly userDiscord?: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, CreateUserDto?] {
        const { email, password, name, confirmed, userDiscord} = object;

        if( !email ) return ['Missing email'];
        if( !name ) return ['Mising name'];
        if( !regularExps.email.test(email)) return ['Email is not valid'];
        if( !password ) return ['Missing password'];
        if( password.length < 6 ) return ['Password too short'];
        if( userDiscord && !regularExps.discord.test(userDiscord)) return ['Discord userName is not valid'];

        return [undefined, new CreateUserDto(email, password, name, confirmed, userDiscord)];

    }
}