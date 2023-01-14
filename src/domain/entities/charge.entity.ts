import { Either, Entity, left, Result, right } from '../contracts';
import { InvalidPropertyError, InvalidOperationError } from '../errors';
import { Email, Name, UUID } from '../value-objects';

export type ChargeProps = {
  name: Name;
  email: Email;
};

export type ChargePrimitivesProps = {
  name: string;
  governmentId: number;
  email: string;
  debtAmount: number;
  debtDueDate: string;
  debtId: number;
};

export class ChargeEntity extends Entity<ChargeProps> {
  protected readonly _id!: UUID;

  static create(
    props: ChargePrimitivesProps
  ): Either<InvalidPropertyError, Result<ChargeEntity>> {
    const idOrErro = UUID.generate();
    if (idOrErro.isFailure) {
      return left(InvalidOperationError.create('Error generating id'));
    }

    const nameOrError = Name.create({ value: props.name });
    if (nameOrError.isLeft()) {
      return left(nameOrError.value);
    }

    const emailOrError = Email.create({ value: props.email });
    if (emailOrError.isLeft()) {
      return left(emailOrError.value);
    }

    return right(
      Result.ok<ChargeEntity>(
        new ChargeEntity({
          id: idOrErro.getValue(),
          props: {
            name: nameOrError.value.getValue(),
            email: emailOrError.value.getValue()
          }
        })
      )
    );
  }
}
