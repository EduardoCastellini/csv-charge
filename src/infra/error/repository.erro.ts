import { Result } from '../../domain/contracts/result';
import { DomainError } from '../../domain/errors/domain-error';

export class RepositoryError extends Result<DomainError> {
  public constructor(message: string) {
    super(false, {
      message
    });
  }

  public static create(message: string): RepositoryError {
    return new RepositoryError(message);
  }
}
