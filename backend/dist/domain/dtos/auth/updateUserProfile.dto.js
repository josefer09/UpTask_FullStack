"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserProfileDto = void 0;
const utils_1 = require("../../../utils");
class UpdateUserProfileDto {
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
    static create(object) {
        const { email, name } = object;
        if (!email)
            return ['Missing email'];
        if (!name)
            return ['Mising name'];
        if (!utils_1.regularExps.email.test(email))
            return ['Email is not valid'];
        return [undefined, new UpdateUserProfileDto(email, name)];
    }
}
exports.UpdateUserProfileDto = UpdateUserProfileDto;
