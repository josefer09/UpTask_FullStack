"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordDto = void 0;
class ChangePasswordDto {
    constructor(current_password, password, password_confirmation) {
        this.current_password = current_password;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }
    static create(object) {
        const { current_password, password, password_confirmation } = object;
        if (!current_password)
            return ['Missing password'];
        if (current_password.length < 6)
            return ['Password too short'];
        if (!password)
            return ['Missing password'];
        if (password.length < 6)
            return ['Password too short'];
        if (password !== password_confirmation)
            return ['Password & Password Confirmation not match'];
        if (!password_confirmation)
            return ['Missing password confirmation'];
        if (password_confirmation.length < 6)
            return ['Password confirmation too short'];
        return [undefined, new ChangePasswordDto(current_password, password, password_confirmation)];
    }
}
exports.ChangePasswordDto = ChangePasswordDto;
