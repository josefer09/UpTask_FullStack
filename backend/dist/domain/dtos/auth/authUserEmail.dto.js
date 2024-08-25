"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserEmailDto = void 0;
const utils_1 = require("../../../utils");
class AuthUserEmailDto {
    constructor(email) {
        this.email = email;
    }
    static create(object) {
        const { email, password } = object;
        if (!email)
            return ['Missing email'];
        if (!utils_1.regularExps.email.test(email))
            return ['Email is not valid'];
        return [undefined, new AuthUserEmailDto(email)];
    }
}
exports.AuthUserEmailDto = AuthUserEmailDto;
