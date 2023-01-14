import { BaseController } from '@/presentation/contracts';
import { Request, Response } from 'express';

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response): Promise<any> => {
    return await controller.execute(req, res);
  };
};
