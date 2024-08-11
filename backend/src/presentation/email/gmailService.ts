import nodemailer, { Transporter } from "nodemailer";
import { envs } from "../../config/envs";
import { IEmail, IEmailService } from "../interfaces";

export class GmailService implements IEmailService {

    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: envs.MAILER_SERVICE,
            auth: {
                user: envs.MAILER_EMAIL,
                pass: envs.MAILER_SECRET_KEY,
            },
        });
    };


    async sendConfirmationEmail(user: IEmail): Promise<void> {
        const info = await this.transporter.sendMail({
            from: envs.MAILER_EMAIL,
            to: user.email,
            subject: "UpTask - Confirmate Count",
            text: "UpTask - Confirmate Count",
            html: `<h1>Validate your email</h1>
                  <p>Hi ${
                    user.name
                  }, click on the following link to validate your email</p>
                  <a href="${478273498234}">Validate your email: ${user.email}</a>
                  <p>And enter the following code: <b>${user.token}</b></p>
                  <p>This token expired in the next 10 minutes</p>
                  
                  `,
          });
      
          console.log("Sent Email: ", info.messageId);
    }

}