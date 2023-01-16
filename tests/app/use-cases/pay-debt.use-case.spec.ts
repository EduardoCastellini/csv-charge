import { IPayDebtUseCase, PayDebtinput, PayDebtUseCase } from '@/app/use-cases';
import { IChargeRepository, Result } from '@/domain/contracts';
import { ChargeEntity } from '@/domain/entities';
import { makeFakeChargeEntity } from '../../domain/mocks';
import { DateVO, Name, UUID } from '@/domain/value-objects';
import { ChargeNotFoundError } from '@/domain/errors';

const makePayDebtinput = (): PayDebtinput => {
  return {
    paidBy: 'any_name',
    debtId: 'any_id',
    paidAmount: 100.25,
    paidAt: '2023-01-16'
  };
};

const makeChargeRepositoryStub = (): IChargeRepository => {
  class chargeRepositoryStub implements IChargeRepository {
    async findAll(): Promise<void | ChargeEntity[]> {
      return new Promise((resolve) => {
        resolve();
      });
    }

    async findOneByDebtId(): Promise<void | ChargeEntity> {
      return new Promise((resolve) => {
        resolve(makeFakeChargeEntity());
      });
    }

    async save(): Promise<ChargeEntity[]> {
      return new Promise((resolve) => {
        resolve([]);
      });
    }

    async update(): Promise<ChargeEntity> {
      return new Promise((resolve) => {
        resolve(makeFakeChargeEntity());
      });
    }
  }

  return new chargeRepositoryStub();
};

type SutTypes = {
  sut: IPayDebtUseCase;
  chargeRepositoryStub: IChargeRepository;
};

const makeSut = (): SutTypes => {
  const chargeRepositoryStub = makeChargeRepositoryStub();

  const sut = new PayDebtUseCase(chargeRepositoryStub);
  return {
    sut,
    chargeRepositoryStub
  };
};

describe('PayDebtUseCase', () => {
  test('Should Pay debt on success', async () => {
    const { sut, chargeRepositoryStub } = makeSut();

    const chargeRepositoryFindOndeSpy = jest.spyOn(
      chargeRepositoryStub,
      'findOneByDebtId'
    );
    const chargeRepositoryUpdateSpy = jest.spyOn(
      chargeRepositoryStub,
      'update'
    );

    const result = await sut.execute(makePayDebtinput());

    expect(result.isRight).toBeTruthy();
    expect(result.value).toEqual(Result.ok());
    expect(chargeRepositoryFindOndeSpy).toHaveBeenCalledWith('any_id');
    expect(chargeRepositoryUpdateSpy).toBeCalledWith(
      expect.objectContaining({
        _id: new UUID({ value: '4b362461-7364-4d67-9586-88ddb50082f0' }),
        _createdAt: expect.any(DateVO),
        _updatedAt: expect.any(DateVO),
        props: {
          ...makeFakeChargeEntity().props,
          paidBy: new Name({ value: 'any_name' }),
          paidAmount: 100.25,
          paidAt: new DateVO('2023-01-16')
        }
      })
    );
  });

  test('Should  return ChargeNotFoundError if charge nor found', async () => {
    const debtId = 'other';
    const { sut, chargeRepositoryStub } = makeSut();

    jest.spyOn(chargeRepositoryStub, 'findOneByDebtId').mockResolvedValue();
    const chargeRepositoryFindOndeSpy = jest.spyOn(
      chargeRepositoryStub,
      'findOneByDebtId'
    );
    const chargeRepositoryUpdateSpy = jest.spyOn(
      chargeRepositoryStub,
      'update'
    );

    const result = await sut.execute({
      ...makePayDebtinput(),
      debtId
    });

    expect(result.isLeft).toBeTruthy();
    expect(result.value).toEqual(ChargeNotFoundError.create(debtId));
    expect(chargeRepositoryFindOndeSpy).toHaveBeenCalledWith(debtId);
    expect(chargeRepositoryUpdateSpy).toHaveBeenCalledTimes(0);
  });
});
