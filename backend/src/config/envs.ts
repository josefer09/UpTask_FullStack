import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),
  FRONTEND_URL: get("FRONTEND_URL").required().asString(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  MAILER_USER: get("MAILER_USER").required().asString(),
  MAILER_PASSWORD: get("MAILER_PASSWORD").required().asString(),
  MAILER_PORT: get("MAILER_PORT").required().asString(),
  MAILER_HOST: get("MAILER_HOST").required().asString(),
};
