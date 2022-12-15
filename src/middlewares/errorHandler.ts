import Koa from 'koa';

/**
 * Error handler middleware
 * 
 * @param  {Object}    ctx Koa context
 * @param  {function}  next Koa next function
 * @return {void}
 */

export default async function errorHandler(ctx: Koa.Context, next: Koa.Next) {
  try {
    ctx.status = 404;
    ctx.response.body = {
      success: false,
      message: 'Not found',
    };
    await next();
  } catch (err: any) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      success: false,
      message: err.message,
    };
  }
}