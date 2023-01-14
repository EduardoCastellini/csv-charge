import './config/module-alias';
import { config } from '@/main/config/env';
import { SqliteConnection } from '@/infra/db/helpers/connection';

try {
  SqliteConnection.connect()
    .then(async () => {
      const { app } = await import('@/main/config/app');
      app.listen(config.port, () =>
        console.log(`Server running at port ${config.port}`)
      );
    })
    .catch(console.error);
} catch (error) {
  console.error(error);
}
