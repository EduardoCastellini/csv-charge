import * as express from 'express';
import { Charges, IListChargeUseCase } from '@/app/use-cases';
import { BaseController } from '../contracts';

export class ListChargeController extends BaseController {
  constructor(private readonly listChargeUseCase: IListChargeUseCase) {
    super();
  }

  protected async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<void | any> {
    try {
      const result = await this.listChargeUseCase.execute();

      if (result.isFailure) {
        return this.clientError(res);
      }

      return this.ok<Charges[]>(res, result.getValue());
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
