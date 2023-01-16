import { Charges, IListChargeUseCase } from '@/app/use-cases';
import { Result } from '@/domain/contracts';
import { ListChargeController } from '@/presentation/controllers';

const charges: Charges = {
  id: '3d4f74d4-b711-4370-8b5f-4441fb11ee01',
  name: 'John Doe',
  governmentId: '11111111111',
  email: 'johndoe@kanastra.com.br',
  debtAmount: 1000000,
  debtDueDate: new Date(),
  debtId: '8291',
  paidAmount: 52.2,
  paidAt: new Date(),
  paidBy: 'John Doe'
};

const makeListChargeUseCaseStub = (): IListChargeUseCase => {
  class ListChargeUseCaseStub implements IListChargeUseCase {
    async execute(): Promise<Result<Charges[]>> {
      return new Promise((resolve) => {
        resolve(Result.ok<Charges[]>([charges]));
      });
    }
  }

  return new ListChargeUseCaseStub();
};

interface SutTypes {
  sut: ListChargeController;
  listChargeUseCase: IListChargeUseCase;
}

const makeSut = (): SutTypes => {
  const listChargeUseCase = makeListChargeUseCaseStub();
  const sut = new ListChargeController(listChargeUseCase);
  return {
    sut,
    listChargeUseCase
  };
};

describe('Create charge Controller', () => {
  test('Should return 200 on success', async () => {
    const { sut, listChargeUseCase } = makeSut();
    const listChargeUseCaseSpy = jest.spyOn(listChargeUseCase, 'execute');

    const httpResponde = await sut.execute({});

    expect(listChargeUseCaseSpy).toHaveBeenCalledTimes(1);
    expect(httpResponde).toEqual({
      status: 200,
      data: [charges]
    });
  });
});
