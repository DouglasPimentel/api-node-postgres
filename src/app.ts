import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app = new Koa();


app.use(bodyParser());
app.use(cors({ maxAge: 86400 }));
app.use(helmet());
app.use(errorHandler);
app.use(routes.routes()).use(routes.allowedMethods());

export default app;
