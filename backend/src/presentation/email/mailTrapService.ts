import nodemailer, { Transporter } from "nodemailer";
import { envs } from "../../config/envs";
import { IEmail, IEmailService } from "../interfaces";
import path from "path";

export class MailTrapService implements IEmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envs.MAILTRAP_HOST,
      port: envs.MAILTRAP_PORT,
      auth: {
        user: envs.MAILTRAP_USER,
        pass: envs.MAILTRAP_PASSWORD,
      },
    });
  }

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
}