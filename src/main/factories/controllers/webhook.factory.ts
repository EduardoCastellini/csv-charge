import { BaseController } from '@/presentation/contracts';
import { WebhookController } from '@/presentation/controllers';
import { makePayDebtUseCase } from '../use-cases';

export const makeWebhookController = (): BaseController => {
  return new WebhookController(makePayDebtUseCase());
};
