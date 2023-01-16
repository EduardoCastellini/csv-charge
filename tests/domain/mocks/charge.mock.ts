import { ChargeEntity } from '@/domain/entities';
import { DateVO, Email, Government, Name, UUID } from '@/domain/value-objects';

export const makeFakeChargeEntity = () => {
  return new ChargeEntity({
    id: new UUID({ value: '4b362461-7364-4d67-9586-88ddb50082f0' }),
    props: {
      name: new Name({ value: 'any_name' }),
      governmentId: new Government({ value: 'any_id' }),
      email: new Email({ value: 'any@email.com' }),
      debtId: 'any_id',
      debtAmount: 100.25,
      debtDueDate: new DateVO('2022-10-12')
    }
  });
};

export const makeFakeChargeEntityPay = () => {
  return new ChargeEntity({
    id: new UUID({ value: '4b362461-7364-4d67-9586-88ddb50082f0' }),
    props: {
      name: new Name({ value: 'any_name' }),
      governmentId: new Government({ value: 'any_id' }),
      email: new Email({ value: 'any@email.com' }),
      debtId: 'any_id',
      debtAmount: 100.25,
      debtDueDate: new DateVO('2022-10-12'),
      paidAmount: 100.25,
      paidAt: new DateVO('2022-10-12'),
      paidBy: new Name({ value: 'any_name' })
    }
  });
};
