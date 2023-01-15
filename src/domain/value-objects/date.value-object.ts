import { left, Either, right, Result } from '../contracts';
import { ValueObject } from '../contracts/value-object';
import { InvalidPropertyError } from '../errors/invalid-property.erro';

type DateVOProps = {
  value: Date;
};
export class DateVO extends ValueObject<DateVOProps> {
  private constructor(value: Date | string | number) {
    super({ value: new Date(value) });
  }

  get value(): Date {
    return this.props.value;
  }

  public static now(): DateVO {
    return new DateVO(new Date());
  }

  private static isDateValid(value: Date | string | number): boolean {
    // if (!(value instanceof Date) || Number.isNaN(value.getTime())) return false;

    return true;
  }

  public static create(
    value: Date | string | number
  ): Either<InvalidPropertyError, Result<DateVO>> {
    if (this.isDateValid(value))
      return right(Result.ok<DateVO>(new DateVO(value)));

    return left(new InvalidPropertyError('Date'));
  }
}
