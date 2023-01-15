import { ChargeEntity } from '@/domain/entities';
import { DateVO, Email, Government, Name, UUID } from '@/domain/value-objects';

export type ChargeModel = {
  id: string;
  name: string;
  email: string;
  governmentId: string;
  debtAmount: number;
  debtDueDate: string;
  debtId: string;
  paidAt?: string;
  paidAmount?: number;
  paidBy?: string;
};

export const ChargeOrmMapper = {
  toEntity(charge: ChargeModel) {
    const {
      id,
      name,
      governmentId,
      email,
      debtAmount,
      debtDueDate,
      debtId,
      paidAmount,
      paidAt,
      paidBy
    } = charge;

    return new ChargeEntity({
      id: new UUID({ value: id }),
      props: {
        name: new Name({ value: name }),
        governmentId: new Government({ value: governmentId }),
        email: new Email({ value: email }),
        debtId,
        debtAmount,
        debtDueDate: new DateVO(debtDueDate),
        paidAmount,
        paidAt: paidAt ? new DateVO(paidAt) : undefined,
        paidBy: paidBy ? new Name({ value: paidBy }) : undefined
      }
    });
  }
};
