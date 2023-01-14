import { Result } from '../contracts/result';
import { DomainError } from './domain-error';

export class InvalidOperationError extends Result<DomainError> {
  public constructor(message: string) {
    super(false, {
      message
    });
  }

  public static create(message: string): InvalidOperationError {
    return new InvalidOperationError(message);
  }
}
