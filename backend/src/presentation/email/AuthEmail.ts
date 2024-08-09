import { Transporter } from "nodemailer";
import { transporter } from "./emailService";
import { envs } from "../../config/envs";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    await transporter.sendMail({
      from: envs.MAILER_EMAIL,
      to: user.email,
      subject: "UpTask - Confirmate Count",
      text: "UpTask - Confirmate Count",
      html: `<h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${478273498234}">Validarte your email: ${user.email}</a>
        `,
    });
  };
}
