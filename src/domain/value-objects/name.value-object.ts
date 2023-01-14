import { left, Either, right, Result } from '../contracts';
import { ValueObject } from '../contracts/value-object';
import { InvalidPropertyError } from '../errors/invalid-property.erro';

type NameProps = {
  value: string;
};

export class Name extends ValueObject<NameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: NameProps) {
    super(props);
  }

  private static isNameValid(value: string): boolean {
    if (value.length <= 2 || value.length > 100) return false;

    return true;
  }

  public static create(
    props: NameProps
  ): Either<InvalidPropertyError, Result<Name>> {
    if (this.isNameValid(props.value))
      return right(Result.ok<Name>(new Name(props)));

    return left(new InvalidPropertyError('Name'));
  }
}
