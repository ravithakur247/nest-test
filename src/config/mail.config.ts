import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  mailKey: process.env.APP_MAIL_KEY,
}));
