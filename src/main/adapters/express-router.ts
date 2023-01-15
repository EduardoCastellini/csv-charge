import { BaseController, HttpResponse } from '@/presentation/contracts';
import { Request, Response } from 'express';

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response): Promise<any> => {
    const request = {
      body: { ...(req.body || {}) },
      params: { ...(req.params || {}) },
      file: { ...(req.file || {}) }
    };

    let httpResponse: HttpResponse;

    try {
      httpResponse = await controller.execute(request);
    } catch (error: any) {
      httpResponse = {
        status: 500,
        data: { message: 'Internal server error!' }
      };
      res.setHeader('Content-Type', 'application/problem+json');
    }

    res.status(httpResponse.status).send(httpResponse.data);
  };
};
