import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import path from 'path';

export default (app: Express): void => {
  const router = Router();

  readdirSync(path.join(__dirname, '/../routes')).forEach(async (file) => {
    if (!file.endsWith('.map')) {
      const route = await import(`../routes/${file}`);
      route.default(router);
    }
  });

  app.use(router);
};
