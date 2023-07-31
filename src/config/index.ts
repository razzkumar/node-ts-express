import { CorsOptions } from 'cors';

import { env } from './env';

const isProduction = env.NODE_ENV === 'production';

export const config = {
  app: {
    env: env.NODE_ENV,
    isProduction: isProduction,
    port: env.PORT,
  },
  database: {
    postgresql: {
      url: env.POSTGRESQL_URL,
    },
  },
  logger: {
    level: env.LOG_LEVEL,
  },
  jwt: {
    secret: env.JWT_SECRET,
    accessToken: {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    },
  },
  cors: {
    origin: ['localhost:3000'],
  } as CorsOptions,
};
