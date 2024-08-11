export interface IEmail {
    email: string;
    name: string;
    token: string;
  }

  export interface IEmailService {
    sendConfirmationEmail(user: IEmail): Promise<void>;
}