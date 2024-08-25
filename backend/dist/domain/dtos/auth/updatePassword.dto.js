"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordDto = void 0;
class UpdatePasswordDto {
    constructor(password, password_confirmation) {
        this.password = password;
        this.password_confirmation = password_confirmation;
    }
    static create(object) {
        const { password, password_confirmation } = object;
        if (!password)
            return ['Missing password'];
        if (password.length < 6)
            return ['Password too short'];
        if (!password_confirmation)
            return ['Missing password confirmation'];
        if (password_confirmation.length < 6)
            return ['Password confirmation too short'];
        if (password == !password_confirmation)
            return ['Password & Password Confirmation not match'];
        return [undefined, new UpdatePasswordDto(password, password_confirmation)];
    }
}
exports.UpdatePasswordDto = UpdatePasswordDto;
