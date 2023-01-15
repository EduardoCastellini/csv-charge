export type GenerateBoletoProps = {
  name: string;
  governmentId: number;
  debtAmount: number;
  debtDueDate: string;
  debtId: number;
};

export type BoletoProps = {
  barCode: string;
  recipient: string;
};

export interface IGenerateBoletoService {
  generate(data: GenerateBoletoProps): BoletoProps;
}
