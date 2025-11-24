import { Injectable, Logger } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

@Injectable()
export class NotifyUtil {
  private static email_transporter: Transporter;

  async sendActivationCode(
    userType: string,
    contact: { email: string },
    code: string,
  ): Promise<string> {
    await NotifyUtil.sendEmail(
      `Acesse o link abaixo para ativar seu usuário na plataforma Therapy.<br/> 
      <a href="${process.env.WEB_HOST}/validar-cadastro?type=${userType}&code=${code}&email=${contact.email}" >Confirmar cadastro</a>`,
      `Código de ativação Therapy`,
      contact.email,
    );
    return 'Código de ativação enviado por email';
  }

  private static getMailTransporter(): Transporter {
    let config = {};

    if ('aws' === process.env.EMAIL_SERVER)
      config = {
        SES: {
          sesClient: new SESv2Client({
            region: process.env.AWS_EMAIL_REGION as string,
            credentials: {
              accessKeyId: process.env.AWS_EMAIL_ACCESS_KEY_ID as string,
              secretAccessKey: process.env
                .AWS_EMAIL_SECRET_ACCESS_KEY as string,
            },
          }),
          SendEmailCommand,
        },
      };
    else
      config = {
        //service: 'gmail',
        host: process.env.EMAIL_HOST as string, //'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL_USERNAME as string,
          pass: process.env.EMAIL_PASSWORD as string,
        },
        secure: 'true' === process.env.EMAIL_SECURE,
        port: Number.parseInt(process.env.EMAIL_PORT as string), //465,
      };
    if (!NotifyUtil.email_transporter)
      NotifyUtil.email_transporter = createTransport(config);

    return NotifyUtil.email_transporter;
  }

  private static async sendEmail(
    text: string,
    subject: string,
    email: string,
  ): Promise<void> {
    await NotifyUtil.getMailTransporter().sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject,
      html: text,
    });

    Logger.debug(`email sent to ${email}`);
  }
}
