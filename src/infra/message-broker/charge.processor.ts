import { DoneCallback, Job } from 'bull';
import { GenerateBoletoService } from '../boleto/generate-boleto';
import { MailService } from '../email/send-mail';

export default async function ({ data }: Job, done: DoneCallback) {
  const mailService = new MailService();
  const generateBoletoService = new GenerateBoletoService();

  try {
    const boleto = generateBoletoService.generate({
      name: data.data.name,
      governmentId: data.data.governmentId,
      debtAmount: data.data.debtAmount,
      debtDueDate: data.data.debtDueData,
      debtId: data.data.debtId
    });

    mailService.send({
      body: `Segue abaixo o boleto para pagamento: 
      ${JSON.stringify(boleto)}
      `,
      from: 'csv_charge@teste.com',
      to: data.data.email,
      subject: `Boleto referente a cobrança ${data.data.debtId}`
    });

    done();
  } catch (error: any) {
    console.log(error);

    done(error);
  }
}
