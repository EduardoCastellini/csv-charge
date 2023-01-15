import { left, Either, right, Result } from '../contracts';
import { ValueObject } from '../contracts/value-object';
import { InvalidPropertyError } from '../errors/invalid-property.erro';

type GovernmentProps = {
  value: number;
};

export class Government extends ValueObject<GovernmentProps> {
  get value(): number {
    return this.props.value;
  }

  private constructor(props: GovernmentProps) {
    super(props);
  }

  private static isGovernmentValid(value: number): boolean {
    // necessary validations
    return true;
  }

  public static create(
    props: GovernmentProps
  ): Either<InvalidPropertyError, Result<Government>> {
    if (this.isGovernmentValid(props.value))
      return right(Result.ok<Government>(new Government(props)));

    return left(new InvalidPropertyError('Government'));
  }
}
