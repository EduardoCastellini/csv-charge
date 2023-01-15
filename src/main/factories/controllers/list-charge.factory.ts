import { BaseController } from '@/presentation/contracts';
import { ListChargeController } from '@/presentation/controllers';
import { makeListChargeUseCase } from '../use-cases';

export const makeListChargeController = (): BaseController => {
  return new ListChargeController(makeListChargeUseCase());
};
