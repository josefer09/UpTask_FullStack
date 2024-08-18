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
  MAILTRAP_USER: get("MAILTRAP_USER").required().asString(),
  MAILTRAP_PASSWORD: get("MAILTRAP_PASSWORD").required().asString(),
  MAILTRAP_HOST: get("MAILTRAP_HOST").required().asString(),
  MAILTRAP_PORT: get("MAILTRAP_PORT").required().asPortNumber(),
  DEV: get("DEV").required().asBool(),
  SECTRET_KEY: get("SECTRET_KEY").required().asString(),
};
