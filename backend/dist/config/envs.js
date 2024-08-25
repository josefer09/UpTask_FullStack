"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)("PORT").required().asPortNumber(),
    MONGO_URL: (0, env_var_1.get)("MONGO_URL").required().asString(),
    MONGO_DB_NAME: (0, env_var_1.get)("MONGO_DB_NAME").required().asString(),
    FRONTEND_URL: (0, env_var_1.get)("FRONTEND_URL").required().asString(),
    MAILER_SERVICE: (0, env_var_1.get)("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: (0, env_var_1.get)("MAILER_EMAIL").required().asString(),
    MAILER_SECRET_KEY: (0, env_var_1.get)("MAILER_SECRET_KEY").required().asString(),
    MAILTRAP_USER: (0, env_var_1.get)("MAILTRAP_USER").required().asString(),
    MAILTRAP_PASSWORD: (0, env_var_1.get)("MAILTRAP_PASSWORD").required().asString(),
    MAILTRAP_HOST: (0, env_var_1.get)("MAILTRAP_HOST").required().asString(),
    MAILTRAP_PORT: (0, env_var_1.get)("MAILTRAP_PORT").required().asPortNumber(),
    DEV: (0, env_var_1.get)("DEV").required().asBool(),
    SECTRET_KEY: (0, env_var_1.get)("SECTRET_KEY").required().asString(),
};
