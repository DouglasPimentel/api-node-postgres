import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import { version } from '../package.json';

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors({ maxAge: 86400 }));
app.use(helmet());
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

export default app;
