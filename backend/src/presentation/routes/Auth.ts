import { Router } from "express";
import { AuthController } from "../controller";
import { AuthService } from "../service/Auth";



export class AuthRoutes {
    static get routes(): Router {


        const router = Router();
        const service = new AuthService();
        const controller = new AuthController(service);

        router.post('/create-count', controller.postCreateUser);
        router.post('/confirm-count', controller.postConfirmCount);


        return router;
    }
}