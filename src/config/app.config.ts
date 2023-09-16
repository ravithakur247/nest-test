import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.APP_NODE_ENV,
  port: parseInt(process.env.APP_PORT),
}));
