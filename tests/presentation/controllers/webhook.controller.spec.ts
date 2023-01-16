import { IPayDebtUseCase, PayDebtOutput } from '@/app/use-cases';
import { left, Result, right } from '@/domain/contracts';
import { ChargeNotFoundError, InvalidPropertyError } from '@/domain/errors';
import { WebhookController } from '@/presentation/controllers';

const makePayDebtUseCaseStub = (): IPayDebtUseCase => {
  class PayDebtUseCaseStub implements IPayDebtUseCase {
    async execute(): Promise<PayDebtOutput> {
      return right(Result.ok());
    }
  }

  return new PayDebtUseCaseStub();
};

interface SutTypes {
  sut: WebhookController;
  payDebtUseCase: IPayDebtUseCase;
}

const makeSut = (): SutTypes => {
  const payDebtUseCase = makePayDebtUseCaseStub();
  const sut = new WebhookController(payDebtUseCase);
  return {
    sut,
    payDebtUseCase
  };
};

const hebhookRequest = {
  debtId: 'any_debt_id',
  paidAt: 'any_paid_at',
  paidAmount: 0,
  paidBy: 'any_paid_by'
};

describe('Webhook Controller', () => {
  it('Shoul call the use case with correct values', async () => {
    const { sut, payDebtUseCase } = makeSut();
    const payDebtUseCaseSpy = jest.spyOn(payDebtUseCase, 'execute');

    sut.execute({
      body: hebhookRequest
    });

    expect(payDebtUseCaseSpy).toHaveBeenCalledWith(hebhookRequest);
  });

  test('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponde = await sut.execute({
      body: hebhookRequest
    });

    expect(httpResponde).toEqual({
      status: 200,
      data: { message: 'Payment notification received successfully' }
    });
  });

  test('Should return ChargeNotFoundError', async () => {
    const { sut, payDebtUseCase } = makeSut();
    jest
      .spyOn(payDebtUseCase, 'execute')
      .mockResolvedValue(
        left(ChargeNotFoundError.create(hebhookRequest.debtId))
      );

    const httpResponde = await sut.execute({
      body: hebhookRequest
    });

    expect(httpResponde).toEqual({
      status: 400,
      data: {
        message: `Charge not found with the given id: ${hebhookRequest.debtId}`
      }
    });
  });

  test('Should return InvalidPropertyError', async () => {
    const { sut, payDebtUseCase } = makeSut();
    jest
      .spyOn(payDebtUseCase, 'execute')
      .mockResolvedValue(
        left(InvalidPropertyError.create('Name', 'invalid_name'))
      );

    const httpResponde = await sut.execute({
      body: hebhookRequest
    });

    expect(httpResponde).toEqual({
      status: 400,
      data: {
        message:
          'The "Name" property with the value "invalid_name", is invalid!'
      }
    });
  });
});
