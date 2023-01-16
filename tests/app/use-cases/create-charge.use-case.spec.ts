import { CreateChargeUseCase, ICreateChargeUseCase } from '@/app/use-cases';
import { IChargeRepository, Result } from '@/domain/contracts';
import { ChargeEntity } from '@/domain/entities';
import {
  IMessageBrokerSendMessage,
  IReadCsv,
  ReadFileOutput
} from '@/app/contracts';
import { makeFakeChargeEntity } from '../../domain/mocks';
import { DateVO, UUID } from '@/domain/value-objects';

const makeReadFileOutput = (): ReadFileOutput => {
  return {
    name: 'any_name',
    governmentId: 'any_id',
    debtAmount: 100.25,
    debtDueDate: '2022-10-12',
    debtId: 'any_id',
    email: 'any@email.com'
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
        resolve();
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

const makeMessageBrokerSendMessageStub = (): IMessageBrokerSendMessage => {
  class MessageBrokerSendMessageStub implements IMessageBrokerSendMessage {
    send(): void {
      jest.fn();
    }
  }

  return new MessageBrokerSendMessageStub();
};

const makeReadCsvStub = (): IReadCsv => {
  class ReadCsvStub implements IReadCsv {
    read(): Promise<ReadFileOutput[]> {
      return new Promise((resolve) => {
        resolve([makeReadFileOutput()]);
      });
    }
  }

  return new ReadCsvStub();
};

type SutTypes = {
  sut: ICreateChargeUseCase;
  chargeRepositoryStub: IChargeRepository;
  messageBrokerSendMessageStub: IMessageBrokerSendMessage;
  readCsvStub: IReadCsv;
};

const makeSut = (): SutTypes => {
  const chargeRepositoryStub = makeChargeRepositoryStub();
  const messageBrokerSendMessageStub = makeMessageBrokerSendMessageStub();
  const readCsvStub = makeReadCsvStub();

  const sut = new CreateChargeUseCase(
    chargeRepositoryStub,
    messageBrokerSendMessageStub,
    readCsvStub
  );
  return {
    sut,
    chargeRepositoryStub,
    messageBrokerSendMessageStub,
    readCsvStub
  };
};

describe('CreateChargeUseCase', () => {
  test('Should create charge on success', async () => {
    const {
      sut,
      chargeRepositoryStub,
      messageBrokerSendMessageStub,
      readCsvStub
    } = makeSut();

    const readCsvSpy = jest.spyOn(readCsvStub, 'read');
    const chargeRepositorySpy = jest.spyOn(chargeRepositoryStub, 'save');
    const messageBrokerSendMessageSpy = jest.spyOn(
      messageBrokerSendMessageStub,
      'send'
    );

    const result = await sut.execute({
      filePath: '/uploads/84419265d6f2bdf36a1792080d3eb8bb'
    });

    expect(result.isRight).toBeTruthy();
    expect(result.value).toEqual(Result.ok());
    expect(readCsvSpy).toHaveBeenCalledWith(
      '/uploads/84419265d6f2bdf36a1792080d3eb8bb'
    );
    expect(chargeRepositorySpy).toBeCalledWith(
      expect.arrayContaining([
        {
          _id: expect.any(UUID),
          _createdAt: expect.any(DateVO),
          _updatedAt: expect.any(DateVO),
          props: {
            ...makeFakeChargeEntity().props
          }
        }
      ])
    );
    expect(messageBrokerSendMessageSpy).toHaveBeenCalledWith({
      data: {
        ...makeReadFileOutput(),
        debtDueDate: new Date(makeReadFileOutput().debtDueDate)
      }
    });
  });
});
