"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const Project_1 = require("./routes/Project");
const Auth_1 = require("./routes/Auth");
class AppRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // Define routes
        router.use('/api/projects', Project_1.ProjectRoutes.routes);
        router.use('/api/auth', Auth_1.AuthRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
