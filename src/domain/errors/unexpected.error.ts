import { Result } from '../contracts';
import { DomainError } from './domain-error';

export class UnexpectedError extends Result<DomainError> {
  public constructor(err: any) {
    super(false, {
      message: `An unexpected error occurred.`,
      error: err
    });
  }

  public static create(err: any): UnexpectedError {
    return new UnexpectedError(err);
  }
}
