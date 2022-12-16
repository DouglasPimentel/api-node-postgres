import Router from 'koa-router';
import UserController from '../controllers/UserController';

const userRouter = new Router({ prefix: '/users' });
const userController = new UserController();

userRouter
  .get('/', userController.listAll)
  .post('/', userController.create)
  .put('/:id', userController.update)
  .delete('/:id', userController.remove);


export default userRouter;  
