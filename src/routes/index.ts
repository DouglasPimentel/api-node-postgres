import Router from 'koa-router';
import homeRouter from './home';
import versionRouter from './version';
import userRouter from './user';

const routes = new Router();

routes
  .use(homeRouter.routes())
  .use(versionRouter.routes())
  .use(userRouter.routes());

export default routes;
