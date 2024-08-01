import { Router } from "express";
import { ProjectRoutes } from "./routes/Project";






export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        // Define routes
        router.use('/api/projects', ProjectRoutes.routes);

        return router;
    }
}