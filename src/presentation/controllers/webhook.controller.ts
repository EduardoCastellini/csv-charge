import { IPayDebtUseCase } from '@/app/use-cases';
import { BaseController, HttpResponse, IRequest } from '../contracts';
import { ChargeNotFoundError, InvalidPropertyError } from '@/domain/errors';

type ReponseBody = {
  message: string;
};

type RequestBody = {
  debtId: string;
  paidAt: string;
  paidAmount: number;
  paidBy: string;
};
export class WebhookController extends BaseController {
  constructor(private readonly payDebtUseCase: IPayDebtUseCase) {
    super();
  }

  protected async executeImpl(
    request: IRequest<RequestBody>
  ): Promise<HttpResponse> {
    try {
      const resultOrError = await this.payDebtUseCase.execute(request.body);

      if (resultOrError.isLeft()) {
        const error = resultOrError.value;

        switch (error.constructor) {
          case ChargeNotFoundError:
            return this.clientError(error.getValue().message);
          case InvalidPropertyError:
            return this.clientError(error.getValue().message);
          default:
            return this.fail(error.getValue().message);
        }
      }

      return this.ok<ReponseBody>({
        message: 'Payment notification received successfully'
      });
    } catch (err: any) {
      return this.fail(err);
    }
  }
}
