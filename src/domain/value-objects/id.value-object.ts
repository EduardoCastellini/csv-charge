import { left, Either, right, Result } from '../contracts';
import { ValueObject } from '../contracts/value-object';
import { InvalidPropertyError } from '../errors/invalid-property.erro';

type IDProps = {
  value: string;
};

export class ID extends ValueObject<IDProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: IDProps) {
    super(props);
  }

  private static isIDValid(value: string): boolean {
    return true;
  }

  public static create(props: IDProps): IDProps {
    return props;
  }
}
