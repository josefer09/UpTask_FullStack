"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestCode = void 0;
const utils_1 = require("../../../utils");
class RequestCode {
    constructor(email) {
        this.email = email;
    }
    static validate(object) {
        const { email } = object;
        if (!email)
            return ['Missing email'];
        if (!utils_1.regularExps.email.test(email))
            return ['Email is not valid'];
        return [undefined, new RequestCode(email)];
    }
}
exports.RequestCode = RequestCode;
