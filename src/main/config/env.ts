export interface IConfig {
  port: number;
  node_env: string;
}

export const config: IConfig = {
  port: Number(process.env.PORT ?? 3000),
  node_env: process.env.NODE_ENV ?? 'development'
};
