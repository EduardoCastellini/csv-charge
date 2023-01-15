import { Result } from '../contracts/result';
import { DomainError } from './domain-error';

export class ChargeNotFoundError extends Result<DomainError> {
  public constructor(debtId: string) {
    super(false, {
      message: `Charge not found with the given id: ${debtId}`
    });
  }

  public static create(debtId: string): ChargeNotFoundError {
    return new ChargeNotFoundError(debtId);
  }
}
