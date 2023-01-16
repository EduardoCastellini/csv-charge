import { left, Either, right, Result } from '../contracts';
import { ValueObject } from '../contracts/value-object';
import { InvalidPropertyError } from '../errors/invalid-property.erro';

type GovernmentProps = {
  value: string;
};

export class Government extends ValueObject<GovernmentProps> {
  get value(): string {
    return this.props.value;
  }

  constructor(props: GovernmentProps) {
    super(props);
  }

  private static isGovernmentValid(value: string): boolean {
    if (!value) return false;
    // necessary validations
    return true;
  }

  public static create(
    props: GovernmentProps
  ): Either<InvalidPropertyError, Result<Government>> {
    if (this.isGovernmentValid(props.value))
      return right(Result.ok<Government>(new Government(props)));

    return left(new InvalidPropertyError('Government', props.value));
  }
}
