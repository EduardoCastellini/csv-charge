export type SendEmailProps = {
  from: string;
  to: string;
  subject: string;
  body: string;
};
export interface IEmailService {
  send(data: SendEmailProps): Promise<void>;
}
