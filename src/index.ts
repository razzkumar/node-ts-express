import { createApp } from './app';
import { config } from './config';
import { logger } from './lib/logger';

const port = config.app.port ?? 8080;

const app = createApp();

app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://0.0.0.0:${port}`);
});
