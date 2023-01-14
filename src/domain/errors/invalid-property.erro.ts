import { Result } from '../contracts/result';
import { DomainError } from './domain-error';

export class InvalidPropertyError extends Result<DomainError> {
  public constructor(propertyName: string, value?: any) {
    super(false, {
      message: `The "${propertyName}" property with the value "${value}", is invalid!`
    });
  }

  public static create(
    propertyName: string,
    value?: any
  ): InvalidPropertyError {
    return new InvalidPropertyError(propertyName, value);
  }
}
