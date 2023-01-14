import * as express from 'express';
import { BaseController } from '../contracts';

export class WebhookController extends BaseController {
  protected async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<void | any> {
    try {
      console.log('req: ', req.body);

      return this.created(res);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
