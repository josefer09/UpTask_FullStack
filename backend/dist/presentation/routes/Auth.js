"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = require("../controller");
const Auth_1 = require("../service/Auth");
const envs_1 = require("../../config/envs");
const mailTrapService_1 = require("../email/mailTrapService");
const gmailService_1 = require("../email/gmailService");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const emailService = envs_1.envs.DEV ? new mailTrapService_1.MailTrapService() : new gmailService_1.GmailService();
        const service = new Auth_1.AuthService(emailService);
        const controller = new controller_1.AuthController(service);
        router.post('/create-account', controller.postCreateUser);
        router.post('/confirm-account', controller.postConfirmCount);
        router.post('/login', controller.postLogin);
        router.post('/request-code', controller.postRequestCode);
        router.post('/forgot-password', controller.postResetPassword);
        router.post('/validate-token', controller.postValidateToken);
        router.post('/update-password/:token', (0, express_validator_1.param)('token').isNumeric().withMessage('Token is required'), validation_1.handleInputError, controller.postUpdatePassword);
        //** Auth */
        router.get('/user', auth_1.authenticate, controller.getUserAuth);
        router.put('/profile', auth_1.authenticate, controller.putUpdateUserProfile);
        router.post('/update-password', auth_1.authenticate, controller.postChangePassword);
        router.post('/check-password', auth_1.authenticate, controller.postCheckPassword);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
