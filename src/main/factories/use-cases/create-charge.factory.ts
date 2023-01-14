import { CreateChargeUseCase, ICreateChargeUseCase } from '@/app/use-cases';
import { SqliteConnection } from '@/infra/db/helpers/connection';
import { SqliteChargeRepository } from '@/infra/db/repositories/charge.repository';

export const makeCreateChargeUseCase = (): ICreateChargeUseCase => {
  const prisma = SqliteConnection.getConnection();
  const chargeRepository = new SqliteChargeRepository({ prisma });

  return new CreateChargeUseCase(chargeRepository);
};
