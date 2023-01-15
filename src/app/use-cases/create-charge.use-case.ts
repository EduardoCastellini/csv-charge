import { ChargeEntity } from '@/domain/entities';
import { InvalidPropertyError, UnexpectedError } from '@/domain/errors';
import { IMessageBrokerSendMessage } from '../contracts';
import {
  Either,
  IChargeRepository,
  IUseCase,
  left,
  Result,
  right
} from '@/domain/contracts';

type CreateChargeOutput = Either<
  InvalidPropertyError | UnexpectedError,
  Result<void>
>;

export type CreateChargeInput = {
  name: string;
  governmentId: number;
  email: string;
  debtAmount: number;
  debtDueDate: string;
  debtId: number;
};

export type ICreateChargeUseCase = IUseCase<
  CreateChargeInput[],
  CreateChargeOutput
>;
export class CreateChargeUseCase implements ICreateChargeUseCase {
  constructor(
    private readonly chargeRepository: IChargeRepository,
    private readonly messageBrokerSendMessage: IMessageBrokerSendMessage
  ) {}

  async execute(input: CreateChargeInput[]): Promise<CreateChargeOutput> {
    try {
      const charges = await Promise.all(
        input.map((charge) => {
          const { name, governmentId, email, debtAmount, debtDueDate, debtId } =
            charge;

          const chargeOrError = ChargeEntity.create({
            name,
            governmentId,
            email,
            debtAmount,
            debtDueDate,
            debtId
          });

          if (chargeOrError.isLeft()) {
            throw chargeOrError.value;
          }

          return chargeOrError.value.getValue();
        })
      );

      await this.chargeRepository.save(charges);

      await Promise.all(
        charges.map((charge) => {
          this.messageBrokerSendMessage.send({
            data: {
              name: charge.props.name.value,
              governmentId: charge.props.governmentId.value,
              email: charge.props.email.value,
              debtAmount: charge.props.debtAmount,
              debtDueDate: charge.props.debtDueDate.value,
              debtId: charge.props.debtId
            }
          });
        })
      );

      return right(Result.ok());
    } catch (error) {
      return left(UnexpectedError.create(error));
    }
  }
}
