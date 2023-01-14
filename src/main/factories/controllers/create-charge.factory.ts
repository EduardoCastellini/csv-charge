import { BaseController } from '@/presentation/contracts';
import { CreateChargeController } from '@/presentation/controllers';
import { makeCreateChargeUseCase } from '../use-cases';

export const makeCreateChargeController = (): BaseController => {
  return new CreateChargeController(makeCreateChargeUseCase());
};
