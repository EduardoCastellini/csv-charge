import * as express from 'express';
import csv from 'csv-parser';
import * as fs from 'fs';

import { BaseController } from '../contracts';
import { CreateChargeInput, ICreateChargeUseCase } from '@/app/use-cases';
import { InvalidPropertyError, UnexpectedError } from '@/domain/errors';

export class CreateChargeController extends BaseController {
  constructor(private readonly createChargeUseCase: ICreateChargeUseCase) {
    super();
  }

  protected async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<void | any> {
    try {
      if (!req.file) {
        return this.notFound(res, 'No file uploaded!');
      }

      const charges: CreateChargeInput[] = [];

      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data: CreateChargeInput) => charges.push(data))
        .on('end', async () => {
          const resultOrError = await this.createChargeUseCase.execute(charges);

          if (resultOrError.isLeft()) {
            const error = resultOrError.value;

            switch (error.constructor) {
              case InvalidPropertyError:
                return this.clientError(res, error.getValue().message);
              case UnexpectedError:
                return this.fail(res, error.getValue().message);
              default:
                return this.fail(res, error.getValue().message);
            }
          }

          return this.created(res);
        });
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
