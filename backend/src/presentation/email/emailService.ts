import nodemailer from 'nodemailer';
import { envs } from '../../config/envs';

const config = () => {
  return {
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  }
}

export const transporter = nodemailer.createTransport(config());