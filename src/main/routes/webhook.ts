import { Router } from 'express';
import { adaptRoute as adapt } from '@/main/adapters/';

export default (router: Router): void => {
  // router.post('/webhook', adapt(webhookController()));
};
