import csv from 'csv-parser';
import * as fs from 'fs';
import { BaseController, HttpResponse, IRequest } from '../contracts';
import { CreateChargeInput, ICreateChargeUseCase } from '@/app/use-cases';
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

      const charges: CreateChargeInput[] = [];

      fs.createReadStream(request.file.path)
        .pipe(csv())
        .on('data', (data: CreateChargeInput) => charges.push(data))
        .on('end', async () => {
          const resultOrError = await this.createChargeUseCase.execute(charges);

          if (resultOrError.isLeft()) {
            const error = resultOrError.value;

            switch (error.constructor) {
              case InvalidPropertyError:
                return this.clientError(error.getValue().message);
              default:
                return this.fail(error.getValue().message);
            }
          }
        });
      return this.created();
    } catch (err: any) {
      return this.fail(err.toString());
    }
  }
}
