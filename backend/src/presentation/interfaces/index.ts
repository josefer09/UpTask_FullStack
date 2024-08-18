export interface IEmail {
    email: string;
    name: string;
    token: string;
  }

  export interface IEmailService {
    sendConfirmationEmail(user: IEmail): Promise<void>;
    sendResetPasswordEmail(user: IEmail): Promise<void>;
}