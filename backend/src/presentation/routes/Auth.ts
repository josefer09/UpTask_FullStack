import { Router } from "express";
import { AuthController } from "../controller";
import { AuthService } from "../service/Auth";
import { envs } from "../../config/envs";
import { MailTrapService } from "../email/mailTrapService";
import { GmailService } from "../email/gmailService";



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


        return router;
    }
}