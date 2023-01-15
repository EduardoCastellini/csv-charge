import * as express from 'express';
import { IPayDebtUseCase } from '@/app/use-cases';
import { BaseController } from '../contracts';
import { ChargeNotFoundError, InvalidPropertyError } from '@/domain/errors';

type webhookResponse = {
  message: string;
};
export class WebhookController extends BaseController {
  constructor(private readonly payDebtUseCase: IPayDebtUseCase) {
    super();
  }

  protected async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<void | any> {
    try {
      const resultOrError = await this.payDebtUseCase.execute(req.body);

      if (resultOrError.isLeft()) {
        const error = resultOrError.value;

        switch (error.constructor) {
          case ChargeNotFoundError:
            return this.clientError(res, error.getValue().message);
          case InvalidPropertyError:
            return this.clientError(res, error.getValue().message);
          default:
            return this.fail(res, error.getValue().message);
        }
      }

      return this.ok<webhookResponse>(res, {
        message: 'Payment notification received successfully'
      });
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
