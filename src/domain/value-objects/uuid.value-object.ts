import { randomUUID } from 'crypto';
import { Result } from '../contracts';
import { ValueObject } from '../contracts/value-object';

type UUIDProps = {
  value: string;
};

export class UUID extends ValueObject<UUIDProps> {
  get value(): string {
    return this.props.value;
  }

  constructor(props: UUIDProps) {
    super(props);
  }

  public static generate(): Result<UUID> {
    return Result.ok<UUID>(new UUID({ value: randomUUID() }));
  }
}
