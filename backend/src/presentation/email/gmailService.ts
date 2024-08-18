import nodemailer, { Transporter } from "nodemailer";
import { envs } from "../../config/envs";
import { IEmail, IEmailService } from "../interfaces";
import path from "path";

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


    sendConfirmationEmail = async (user: IEmail) => {
        const info = await this.transporter.sendMail({
          from: envs.MAILER_EMAIL,
          to: user.email,
          subject: "UpTask - Confirmate Count",
          text: "UpTask - Confirmate Count",
          html: `<h1>Validate your email</h1>
                <p>Hi ${
                  user.name
                }, click on the following link to validate your email</p>
                <a href="${envs.FRONTEND_URL}/auth/confirm-account">Validate your email: ${user.email}</a>
                <p>And enter the following code: <b>${user.token}</b></p>
                <p>This token expired in the next 10 minutes</p>
                <div style="text-align: center">
                  <img src="cid:logoHeader" style="width: 100px; height: auto;" />
                </div>
                `,
                attachments: [
                  {
                    filename: 'logoHeaderV2.svg',
                    path: path.join(__dirname, '../../../public/logoHeaderV2.svg'),
                    cid: 'logoHeader', // same cid value as in the html img src
                  },
                ],
        });
    
        console.log("Sent Email: ", info.messageId);
      };

    async sendResetPasswordEmail(user: IEmail): Promise<void> {
        const info = await this.transporter.sendMail({
            from: envs.MAILER_EMAIL,
            to: user.email,
            subject: "UpTask - Reset Password",
            text: "UpTask - Reset Password",
            html: `<h1>Reset your password</h1>
                  <p>Hi ${
                    user.name
                  }, you have requested to reset your password</p>
                  <p>Visit the following link</p>
                  <a href="${envs.FRONTEND_URL}/auth/new-password">Reset</a>
                  <p>And enter the following code: <b>${user.token}</b></p>
                  <p>This token expired in the next 10 minutes</p>
                  <div style="text-align: center">
                    <img src="cid:logoHeader" style="width: 200px; height: auto;" />
                  </div>
                  `,
                  attachments: [
                    {
                      filename: 'logoHeaderV2.svg',
                      path: path.join(__dirname, '../../../public/logoHeaderV2.svg'),
                      cid: 'logoHeader', // same cid value as in the html img src
                    },
                  ],
          });
      
          console.log("Sent Email: ", info.messageId);
    }

}