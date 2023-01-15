export interface IConfig {
  port: number;
  node_env: string;
  redis: {
    host: string;
    port: number;
  };
}

export const config: IConfig = {
  port: Number(process.env.PORT ?? 3000),
  node_env: process.env.NODE_ENV ?? 'development',
  redis: {
    host: process.env.REDIS_HOST ?? 'redis',
    port: Number(process.env.REDIS_PORT ?? 6379)
  }
};
