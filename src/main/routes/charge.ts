import { Router } from 'express';
import multer from 'multer';
import { adaptRoute as adapt } from '@/main/adapters/';
import {
  makeCreateChargeController,
  makeListChargeController
} from '../factories/controllers';

const upload = multer({ dest: 'uploads/' });

export default (router: Router): void => {
  router.post(
    '/charge',
    upload.single('file'),
    adapt(makeCreateChargeController())
  );

  router.get('/charge', adapt(makeListChargeController()));
};
