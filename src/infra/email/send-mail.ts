import { IEmailService, SendEmailProps } from '@/app/contracts';

export class MailService implements IEmailService {
  async send({ body, from, subject, to }: SendEmailProps): Promise<void> {
    try {
      console.log('Sending E-mail', {
        from,
        to,
        subject,
        body
      });
    } catch (error) {
      console.log('Sending E-mail Error', error);
    }
  }
}
