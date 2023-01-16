import { CreateChargeUseCase, ICreateChargeUseCase } from '@/app/use-cases';
import { ReadCsv } from '@/infra/csv/read-csv';
import { SqliteConnection } from '@/infra/db/helpers/connection';
import { SqliteChargeRepository } from '@/infra/db/repositories/charge.repository';
import { MessageBroker } from '@/infra/message-broker/bull-adapter';

export const makeCreateChargeUseCase = (): ICreateChargeUseCase => {
  const prisma = SqliteConnection.getConnection();
  const chargeRepository = new SqliteChargeRepository({ prisma });

  const messageBroker = new MessageBroker();

  const readCsv = new ReadCsv();

  return new CreateChargeUseCase(chargeRepository, messageBroker, readCsv);
};
