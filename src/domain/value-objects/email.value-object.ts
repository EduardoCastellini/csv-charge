import { left, Either, right, Result } from '../contracts';
import { ValueObject } from '../contracts/value-object';
import { InvalidPropertyError } from '../errors/invalid-property.erro';

type EmailProps = {
  value: string;
};

export class Email extends ValueObject<EmailProps> {
  get value(): string {
    return this.props.value;
  }

  constructor(props: EmailProps) {
    super(props);
  }

  private static isEmailValid(value: string): boolean {
    if (!value) return false;

    const string = String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!string) return false;

    return true;
  }

  public static create(
    props: EmailProps
  ): Either<InvalidPropertyError, Result<Email>> {
    if (this.isEmailValid(props.value))
      return right(Result.ok<Email>(new Email(props)));

    return left(new InvalidPropertyError('Email'));
  }
}
