import { Router } from 'express';
import { adaptRoute as adapt } from '@/main/adapters/';
import { makeWebhookController } from '../factories/controllers/webhook.factory';

export default (router: Router): void => {
  router.post('/webhook', adapt(makeWebhookController()));
};
