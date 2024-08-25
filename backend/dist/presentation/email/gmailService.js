"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const envs_1 = require("../../config/envs");
const path_1 = __importDefault(require("path"));
class GmailService {
    constructor() {
        this.sendConfirmationEmail = (user) => __awaiter(this, void 0, void 0, function* () {
            const info = yield this.transporter.sendMail({
                from: envs_1.envs.MAILER_EMAIL,
                to: user.email,
                subject: "UpTask - Confirmate Count",
                text: "UpTask - Confirmate Count",
                html: `<h1>Validate your email</h1>
                <p>Hi ${user.name}, click on the following link to validate your email</p>
                <a href="${envs_1.envs.FRONTEND_URL}/auth/confirm-account">Validate your email: ${user.email}</a>
                <p>And enter the following code: <b>${user.token}</b></p>
                <p>This token expired in the next 10 minutes</p>
                <div style="text-align: center">
                  <img src="cid:logoHeader" style="width: 100px; height: auto;" />
                </div>
                `,
                attachments: [
                    {
                        filename: 'logoHeaderV2.svg',
                        path: path_1.default.join(__dirname, '../../../public/logoHeaderV2.svg'),
                        cid: 'logoHeader', // same cid value as in the html img src
                    },
                ],
            });
            console.log("Sent Email: ", info.messageId);
        });
        this.transporter = nodemailer_1.default.createTransport({
            service: envs_1.envs.MAILER_SERVICE,
            auth: {
                user: envs_1.envs.MAILER_EMAIL,
                pass: envs_1.envs.MAILER_SECRET_KEY,
            },
        });
    }
    ;
    sendResetPasswordEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this.transporter.sendMail({
                from: envs_1.envs.MAILER_EMAIL,
                to: user.email,
                subject: "UpTask - Reset Password",
                text: "UpTask - Reset Password",
                html: `<h1>Reset your password</h1>
                  <p>Hi ${user.name}, you have requested to reset your password</p>
                  <p>Visit the following link</p>
                  <a href="${envs_1.envs.FRONTEND_URL}/auth/new-password">Reset</a>
                  <p>And enter the following code: <b>${user.token}</b></p>
                  <p>This token expired in the next 10 minutes</p>
                  <div style="text-align: center">
                    <img src="cid:logoHeader" style="width: 200px; height: auto;" />
                  </div>
                  `,
                attachments: [
                    {
                        filename: 'logoHeaderV2.svg',
                        path: path_1.default.join(__dirname, '../../../public/logoHeaderV2.svg'),
                        cid: 'logoHeader', // same cid value as in the html img src
                    },
                ],
            });
            console.log("Sent Email: ", info.messageId);
        });
    }
}
exports.GmailService = GmailService;
