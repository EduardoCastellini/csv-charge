import { Charges, IListChargeUseCase } from '@/app/use-cases';
import { BaseController, HttpResponse } from '../contracts';

export class ListChargeController extends BaseController {
  constructor(private readonly listChargeUseCase: IListChargeUseCase) {
    super();
  }

  protected async executeImpl(): Promise<HttpResponse> {
    try {
      const result = await this.listChargeUseCase.execute();

      if (result.isFailure) {
        return this.clientError();
      }

      return this.ok<Charges[]>(result.getValue());
    } catch (err: any) {
      return this.fail(err);
    }
  }
}
