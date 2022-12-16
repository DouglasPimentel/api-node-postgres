import Router from 'koa-router';
import { version } from '../../package.json';

const versionRouter = new Router({ prefix: '/version' });

versionRouter.get('/', ctx => {
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    version: version,
  };
});

export default versionRouter;
