import { createServer } from 'http';
import app from './app';
import config from './config';

(() => {
  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`Starting: ${config.APP_NAME}`);
    console.log(`The Server running on http://localhost:${config.PORT}/`);
    console.log('Press Ctrl+C to end the server.');
  });
})();
