"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateToken = void 0;
class ValidateToken {
    constructor(token) {
        this.token = token;
    }
    static validate(object) {
        const { token } = object;
        if (!token)
            return ['Missing Token'];
        return [undefined, new ValidateToken(token)];
    }
}
exports.ValidateToken = ValidateToken;
