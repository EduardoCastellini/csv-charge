import { left, Either, right, Result } from '../contracts';
import { ValueObject } from '../contracts/value-object';
import { InvalidPropertyError } from '../errors/invalid-property.erro';

type DateVOProps = {
  value: Date;
};

export class DateVO extends ValueObject<DateVOProps> {
  get value(): Date {
    return this.props.value;
  }

  private constructor(props: DateVOProps) {
    super(props);
  }

  public static now(): DateVO {
    return new DateVO({ value: new Date() });
  }

  private static isDateValid(value: Date): boolean {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) return false;

    return true;
  }

  public static create(
    props: DateVOProps
  ): Either<InvalidPropertyError, Result<DateVO>> {
    if (this.isDateValid(props.value))
      return right(Result.ok<DateVO>(new DateVO(props)));

    return left(new InvalidPropertyError('Date'));
  }
}
