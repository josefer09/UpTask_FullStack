import { Router } from "express";
import { ProjectRoutes } from "./routes/Project";
import { AuthRoutes } from "./routes/Auth";






export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        // Define routes
        router.use('/api/projects', ProjectRoutes.routes);
        router.use('/api/auth', AuthRoutes.routes);

        return router;
    }
}