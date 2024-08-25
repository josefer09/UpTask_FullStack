"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPasswordDto = void 0;
class CheckPasswordDto {
    constructor(password) {
        this.password = password;
    }
    static create(object) {
        const { password } = object;
        if (!password)
            return ['Missing password'];
        if (password.length < 6)
            return ['Password too short'];
        return [undefined, new CheckPasswordDto(password)];
    }
}
exports.CheckPasswordDto = CheckPasswordDto;
