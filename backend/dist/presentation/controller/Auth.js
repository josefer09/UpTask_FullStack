"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const utils_1 = require("../../utils");
const createUser_dto_1 = require("../../domain/dtos/auth/createUser.dto");
const validateToken_dto_1 = require("../../domain/dtos/token/validateToken.dto");
const authUser_dto_1 = require("../../domain/dtos/auth/authUser.dto");
const requestCode_dto_1 = require("../../domain/dtos/token/requestCode.dto");
const authUserEmail_dto_1 = require("../../domain/dtos/auth/authUserEmail.dto");
const updatePassword_dto_1 = require("../../domain/dtos/auth/updatePassword.dto");
const updateUserProfile_dto_1 = require("../../domain/dtos/auth/updateUserProfile.dto");
const changePassword_dto_1 = require("../../domain/dtos/auth/changePassword.dto");
const checkPassword_dto_1 = require("../../domain/dtos/auth/checkPassword.dto");
class AuthController {
    // DI
    constructor(service) {
        this.service = service;
        this.handleError = (error, res) => {
            if (error instanceof utils_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            return res.status(500).json({ msg: "Internal Server Error " });
        };
        this.postCreateUser = (req, res) => {
            const [error, createUserDto] = createUser_dto_1.CreateUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.service.createAcount(createUserDto)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.postConfirmCount = (req, res) => {
            const [error, validateToken] = validateToken_dto_1.ValidateToken.validate(req.body);
            if (error)
                return res.status(400).json({ error });
            this.service.confirmAcount(validateToken)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.postLogin = (req, res) => {
            const [error, authUserDto] = authUser_dto_1.AuthUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.service.authUser(authUserDto)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.postRequestCode = (req, res) => {
            const [error, email] = requestCode_dto_1.RequestCode.validate(req.body);
            if (error)
                return res.status(400).json({ error });
            this.service.requestConfirmedCode(email)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.postResetPassword = (req, res) => {
            const [error, email] = authUserEmail_dto_1.AuthUserEmailDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            this.service.forgotPassword(email)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.postValidateToken = (req, res) => {
            const [error, validateToken] = validateToken_dto_1.ValidateToken.validate(req.body);
            if (error)
                return res.status(400).json({ error });
            this.service.validateToken(validateToken)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.postUpdatePassword = (req, res) => {
            const [error, updatePassword] = updatePassword_dto_1.UpdatePasswordDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            // Token
            const { token } = req.params;
            this.service.updatePassword(updatePassword, token)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.getUserAuth = (req, res) => {
            const user = req.user;
            return res.json(user);
        };
        this.putUpdateUserProfile = (req, res) => {
            const [error, updateUserProfileDto] = updateUserProfile_dto_1.UpdateUserProfileDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            // User
            const user = req.user;
            this.service.updateProfile(user, updateUserProfileDto)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.postChangePassword = (req, res) => {
            const [error, changePasswordDto] = changePassword_dto_1.ChangePasswordDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            // User
            const user = req.user;
            this.service.changePassword(user, changePasswordDto)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
        this.postCheckPassword = (req, res) => {
            const [error, checkPasswordDto] = checkPassword_dto_1.CheckPasswordDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            // User
            const user = req.user;
            this.service.checkPassword(user, checkPasswordDto)
                .then(response => res.json(response))
                .catch(error => this.handleError(error, res));
        };
    }
}
exports.AuthController = AuthController;
