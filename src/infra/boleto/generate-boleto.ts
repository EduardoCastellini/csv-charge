import {
  BoletoProps,
  GenerateBoletoProps,
  IGenerateBoletoService
} from '@/app/contracts';

export class GenerateBoletoService implements IGenerateBoletoService {
  generate(data: GenerateBoletoProps): BoletoProps {
    console.log(`Generating the boleto for the customer: ${data.name}`);

    return {
      barCode: '00190500954014481606906809350314337370000000100',
      recipient: 'CSC CHARGE LTDA / 64.700.351/0001-98'
    };
  }
}
