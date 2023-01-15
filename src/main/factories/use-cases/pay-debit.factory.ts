import { IPayDebtUseCase, PayDebtUseCase } from '@/app/use-cases';
import { SqliteConnection } from '@/infra/db/helpers/connection';
import { SqliteChargeRepository } from '@/infra/db/repositories/charge.repository';

export const makePayDebtUseCase = (): IPayDebtUseCase => {
  const prisma = SqliteConnection.getConnection();
  const chargeRepository = new SqliteChargeRepository({ prisma });

  return new PayDebtUseCase(chargeRepository);
};
