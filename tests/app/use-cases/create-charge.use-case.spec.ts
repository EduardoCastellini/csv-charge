import {
  CreateChargeInput,
  CreateChargeUseCase,
  ICreateChargeUseCase
} from '@/app/use-cases';
import { IChargeRepository, Result } from '@/domain/contracts';
import { ChargeEntity } from '@/domain/entities';
import { IMessageBrokerSendMessage } from '@/app/contracts';
import { makeFakeChargeEntity } from '../../domain/mocks';
import { DateVO, UUID } from '@/domain/value-objects';

const makeCreateChargeInput = (): CreateChargeInput => {
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

type SutTypes = {
  sut: ICreateChargeUseCase;
  chargeRepositoryStub: IChargeRepository;
  messageBrokerSendMessageStub: IMessageBrokerSendMessage;
};

const makeSut = (): SutTypes => {
  const chargeRepositoryStub = makeChargeRepositoryStub();
  const messageBrokerSendMessageStub = makeMessageBrokerSendMessageStub();

  const sut = new CreateChargeUseCase(
    chargeRepositoryStub,
    messageBrokerSendMessageStub
  );
  return { sut, chargeRepositoryStub, messageBrokerSendMessageStub };
};

describe('CreateChargeUseCase', () => {
  test('Should create charge on success', async () => {
    const { sut, chargeRepositoryStub, messageBrokerSendMessageStub } =
      makeSut();

    const chargeRepositorySpy = jest.spyOn(chargeRepositoryStub, 'save');
    const messageBrokerSendMessageSpy = jest.spyOn(
      messageBrokerSendMessageStub,
      'send'
    );

    const result = await sut.execute([makeCreateChargeInput()]);

    expect(result.isRight).toBeTruthy();
    expect(result.value).toEqual(Result.ok());
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
        ...makeCreateChargeInput(),
        debtDueDate: new Date(makeCreateChargeInput().debtDueDate)
      }
    });
  });
});
