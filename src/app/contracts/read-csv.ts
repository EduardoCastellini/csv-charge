export type ReadFileOutput = {
  name: string;
  governmentId: string;
  email: string;
  debtAmount: number;
  debtDueDate: string;
  debtId: string;
};

export interface IReadCsv {
  read(path: string): Promise<ReadFileOutput[]>;
}
