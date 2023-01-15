import { ChargeNotFoundError, InvalidPropertyError } from '@/domain/errors';
import {
  Either,
  IChargeRepository,
  IUseCase,
  left,
  Result,
  right
} from '@/domain/contracts';
import { DateVO, Name } from '@/domain/value-objects';

type PayDebtinput = {
  debtId: string;
  paidAt: string;
  paidAmount: number;
  paidBy: string;
};

export type PayDebtOutput = Either<
  ChargeNotFoundError | InvalidPropertyError,
  Result<void>
>;

export type IPayDebtUseCase = IUseCase<PayDebtinput, PayDebtOutput>;

export class PayDebtUseCase implements IPayDebtUseCase {
  constructor(private readonly chargeRepository: IChargeRepository) {}

  async execute({
    debtId,
    paidAmount,
    paidAt,
    paidBy
  }: PayDebtinput): Promise<PayDebtOutput> {
    const charge = await this.chargeRepository.findOneByDebtId(debtId);

    if (!charge) return left(ChargeNotFoundError.create(debtId));

    const paidAtOrError = DateVO.create(paidAt);
    if (paidAtOrError.isLeft()) {
      return left(paidAtOrError.value);
    }

    const paidByOrError = Name.create({ value: paidBy });
    if (paidByOrError.isLeft()) {
      return left(paidByOrError.value);
    }

    charge.pay({
      paidAmount,
      paidAt: paidAtOrError.value.getValue(),
      paidBy: paidByOrError.value.getValue()
    });

    await this.chargeRepository.update(charge);

    return right(Result.ok());
  }
}
