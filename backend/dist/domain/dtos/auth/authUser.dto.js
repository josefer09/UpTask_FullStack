"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserDto = void 0;
const utils_1 = require("../../../utils");
class AuthUserDto {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    static create(object) {
        const { email, password } = object;
        if (!email)
            return ['Missing email'];
        if (!utils_1.regularExps.email.test(email))
            return ['Email is not valid'];
        if (!password)
            return ['Missing password'];
        return [undefined, new AuthUserDto(email, password)];
    }
}
exports.AuthUserDto = AuthUserDto;
