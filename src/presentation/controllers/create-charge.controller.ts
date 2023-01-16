import { BaseController, HttpResponse, IRequest } from '../contracts';
import { ICreateChargeUseCase } from '@/app/use-cases';
import { InvalidPropertyError } from '@/domain/errors';

export class CreateChargeController extends BaseController {
  constructor(private readonly createChargeUseCase: ICreateChargeUseCase) {
    super();
  }

  protected async executeImpl(request: IRequest<any>): Promise<HttpResponse> {
    try {
      if (!request.file) {
        return this.notFound('No file uploaded!');
      }

      const resultOrError = await this.createChargeUseCase.execute({
        filePath: request.file.path
      });

      if (resultOrError.isLeft()) {
        const error = resultOrError.value;

        switch (error.constructor) {
          case InvalidPropertyError:
            return this.clientError(error.getValue().message);
          default:
            return this.fail(error.getValue().message);
        }
      }

      return this.created();
    } catch (error: any) {
      if (error instanceof InvalidPropertyError) {
        return this.clientError(error.getValue().message);
      }
      return this.fail(error.toString());
    }
  }
}
