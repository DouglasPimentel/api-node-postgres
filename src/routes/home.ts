import Router from 'koa-router';

const homeRouter = new Router({ prefix: '/' });

homeRouter.get('/', ctx => {
  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    message: 'API Node.js with PostgreSQL',
  };
});

export default homeRouter;
