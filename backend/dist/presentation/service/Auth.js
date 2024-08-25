"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const utils_1 = require("../../utils");
const User_1 = __importDefault(require("../../model/User"));
const Token_1 = __importDefault(require("../../model/Token"));
const jsonWebToken_1 = require("../../utils/jsonWebToken");
class AuthService {
    // DI
    constructor(emailService) {
        this.emailService = emailService;
    }
    createAcount(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate User exist
                const userExist = yield User_1.default.findOne({ email: createUserDto.email });
                if (userExist)
                    throw utils_1.CustomError.forbidden("Email alredy exist");
                // creating user
                const user = new User_1.default(createUserDto);
                // Hashing password
                user.password = utils_1.BcryptAdapter.hash(createUserDto.password);
                // Generate Token
                const token = new Token_1.default();
                token.token = (0, utils_1.generateToken)();
                token.user = user.id;
                // Save
                yield Promise.allSettled([user.save(), token.save()]);
                // Send Email
                this.emailService.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token,
                });
                return { msg: "User Created" };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                console.log(error);
                throw utils_1.CustomError.internalServer("Server Error");
            }
        });
    }
    confirmAcount(validateToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenExist = yield Token_1.default.findOne({ token: validateToken.token });
                if (!tokenExist)
                    throw utils_1.CustomError.notFound("Token not valid");
                const user = yield User_1.default.findById(tokenExist.user);
                user.confirmed = true;
                yield Promise.allSettled([user.save(), tokenExist.deleteOne()]);
                return { msg: "Account Confirmed Successfully" };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                console.log(error);
                throw utils_1.CustomError.internalServer("Server Error");
            }
        });
    }
    authUser(authUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ email: authUserDto.email });
                if (!user)
                    throw utils_1.CustomError.notFound(`User with email: ${authUserDto.email} not found`);
                // Validar si la cuenta esta confirmada
                if (!user.confirmed) {
                    // Send token
                    const token = new Token_1.default();
                    token.user = user.id;
                    token.token = (0, utils_1.generateToken)();
                    yield token.save();
                    // Send email
                    this.emailService.sendConfirmationEmail({
                        email: user.email,
                        name: user.name,
                        token: token.token,
                    });
                    throw utils_1.CustomError.badRequest("Unconfirmed user, we have sent you a token to your email to confirm the acount");
                }
                // Comparamos las contrasenas
                const userPassMatch = utils_1.BcryptAdapter.compare(authUserDto.password, user.password);
                if (!userPassMatch)
                    throw utils_1.CustomError.badRequest("Password incorrect");
                // Create JSON Web Token
                const token = jsonWebToken_1.JsonWebToken.generateToken({ id: user.id });
                return {
                    msg: "Login successful",
                    token,
                };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                console.log(error);
                throw utils_1.CustomError.internalServer("Server Error");
            }
        });
    }
    requestConfirmedCode(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate User exist
                const user = yield User_1.default.findOne({ email: data.email });
                if (!user)
                    throw utils_1.CustomError.forbidden("User is not registered");
                if (user.confirmed)
                    throw utils_1.CustomError.forbidden("Account is alredy confirmed");
                // Generate Token
                const token = new Token_1.default();
                token.token = (0, utils_1.generateToken)();
                token.user = user.id;
                // Save
                yield Promise.allSettled([user.save(), token.save()]);
                // Send Email
                this.emailService.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token,
                });
                return { msg: "A token has been sent to your email" };
            }
            catch (error) {
                console.log(error);
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer("Server Error");
            }
        });
    }
    forgotPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate User exist
                const user = yield User_1.default.findOne({ email: data.email });
                if (!user)
                    throw utils_1.CustomError.forbidden("User is not registered");
                // Generate Token
                const token = new Token_1.default();
                token.token = (0, utils_1.generateToken)();
                token.user = user.id;
                yield token.save();
                // Send Email
                this.emailService.sendResetPasswordEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token,
                });
                return { msg: "An email with instruction has been sent" };
            }
            catch (error) {
                console.log(error);
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer("Server Error");
            }
        });
    }
    validateToken(validateToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenExist = yield Token_1.default.findOne({ token: validateToken.token });
                if (!tokenExist)
                    throw utils_1.CustomError.notFound("Token not valid");
                return { msg: "Valid Token, set your new password" };
            }
            catch (error) {
                console.log(error);
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer("Server Error");
            }
        });
    }
    updatePassword(updatePassword, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenExist = yield Token_1.default.findOne({ token: token.toString() });
                if (!tokenExist)
                    throw utils_1.CustomError.notFound("Token not valid");
                // User
                const user = yield User_1.default.findById(tokenExist.user);
                if (!user)
                    throw utils_1.CustomError.notFound("User not found");
                // Validate password
                if (updatePassword.password !== updatePassword.password_confirmation)
                    throw utils_1.CustomError.badRequest("The Password do not match");
                // Hash & Update Password
                user.password = utils_1.BcryptAdapter.hash(updatePassword.password);
                yield Promise.allSettled([user.save(), tokenExist.deleteOne()]);
                return { msg: "The Password was successfully updated" };
            }
            catch (error) {
                console.log(error);
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer("Server Error");
            }
        });
    }
    updateProfile(user, updateUserProfileDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield User_1.default.findOne({ email: updateUserProfileDto.email });
            if (userExist && userExist.id.toString() !== user.id.toString())
                throw utils_1.CustomError.badRequest("Email is already registered");
            user.email = updateUserProfileDto.email;
            user.name = updateUserProfileDto.name;
            try {
                yield user.save();
                return { msg: "Profile updated successfully" };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer("Server Error");
            }
        });
    }
    changePassword(user, changePasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExist = yield User_1.default.findById(user.id);
                const isCorrectPassword = utils_1.BcryptAdapter.compare(changePasswordDto.current_password, userExist.password);
                if (!isCorrectPassword)
                    throw utils_1.CustomError.badRequest("Current Password is incorrect");
                userExist.password = utils_1.BcryptAdapter.hash(changePasswordDto.password);
                yield userExist.save();
                return { msg: "The password was successfully changed" };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer("Server Error");
            }
        });
    }
    checkPassword(user, checkPasswordDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExist = yield User_1.default.findById(user.id);
                const isCorrectPassword = utils_1.BcryptAdapter.compare(checkPasswordDto.password, userExist.password);
                if (!isCorrectPassword)
                    throw utils_1.CustomError.badRequest("Incorrect Password");
                return { msg: 'Correct Password' };
            }
            catch (error) {
                if (error instanceof utils_1.CustomError)
                    throw error;
                throw utils_1.CustomError.internalServer("Server Error");
            }
        });
    }
}
exports.AuthService = AuthService;
