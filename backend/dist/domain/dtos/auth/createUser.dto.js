"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const regular_exp_1 = require("../../../utils/regular-exp");
class CreateUserDto {
    constructor(email, password, name, confirmed, userDiscord) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.confirmed = confirmed;
        this.userDiscord = userDiscord;
    }
    static create(object) {
        const { email, password, name, confirmed, userDiscord } = object;
        if (!email)
            return ['Missing email'];
        if (!name)
            return ['Mising name'];
        if (!regular_exp_1.regularExps.email.test(email))
            return ['Email is not valid'];
        if (!password)
            return ['Missing password'];
        if (password.length < 6)
            return ['Password too short'];
        if (userDiscord && !regular_exp_1.regularExps.discord.test(userDiscord))
            return ['Discord userName is not valid'];
        return [undefined, new CreateUserDto(email, password, name, confirmed, userDiscord)];
    }
}
exports.CreateUserDto = CreateUserDto;
