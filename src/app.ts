import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import { version } from '../package.json';
import errorHandler from './middlewares/errorHandler';
import UserController from './controllers/UserController';

const app = new Koa();
const router = new Router();
const userController = new UserController();

app.use(bodyParser());
app.use(cors({ maxAge: 86400 }));
app.use(helmet());
app.use(errorHandler);
app.use(router.routes()).use(router.allowedMethods());

router.get('/', ctx => {
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    message: 'API Node.js with PostgreSQL',
  };
});

router.get('/version', ctx => {
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    version: version,
  };
});

// user router
router
  .get('/users', userController.listAll)
  .post('/users', userController.create)
  .put('/users/:id', userController.update)
  .delete('/users/:id', userController.remove)

export default app;
