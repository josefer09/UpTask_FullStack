import { Router } from "express";
import { param } from "express-validator";
import { AuthController } from "../controller";
import { AuthService } from "../service/Auth";
import { envs } from "../../config/envs";
import { MailTrapService } from "../email/mailTrapService";
import { GmailService } from "../email/gmailService";
import { handleInputError } from "../middleware/validation";
import { authenticate } from "../middleware/auth";



export class AuthRoutes {
    static get routes(): Router {


        const router = Router();
        const emailService = envs.DEV ? new MailTrapService() : new GmailService();
        const service = new AuthService(emailService);
        const controller = new AuthController(service);

        router.post('/create-account', controller.postCreateUser);
        router.post('/confirm-account', controller.postConfirmCount);
        router.post('/login', controller.postLogin);
        router.post('/request-code', controller.postRequestCode);
        router.post('/forgot-password', controller.postResetPassword);
        router.post('/validate-token', controller.postValidateToken);
        router.post('/update-password/:token', param('token').isNumeric().withMessage('Token is required'), handleInputError, controller.postUpdatePassword);
        //** Auth */
        router.get('/user', authenticate, controller.getUserAuth);
        router.put('/profile', authenticate, controller.putUpdateUserProfile);
        router.post('/update-password', authenticate, controller.postChangePassword);
        router.post('/check-password', authenticate, controller.postCheckPassword);


        return router;
    }
}