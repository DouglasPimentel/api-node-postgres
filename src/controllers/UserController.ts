import Koa from 'koa';
import { prisma } from '../database';
import bcrypt from 'bcrypt';
import findUser from '../utils/findUser';

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export default class UserController {
  async listAll(ctx: Koa.Context) {
    try {
      const users = await prisma.user.findMany({
        orderBy: {
          name: 'asc',
        },
      });

      ctx.response.status =  200;
      ctx.response.body = {
        success: true,
        users: users,
      };
    } catch (err) {
      ctx.status = 500;
      ctx.response.body = {
        success: false,
        message: 'Internal server error', 
        error: err,
      }
    } 
}

  async create(ctx: Koa.Context) {
    const data = <UserRequest>ctx.request.body;

    if (!data.name || !data.email || !data.password) {
      ctx.status = 400;
      ctx.response.body = {
        success: false,
        message: 'Required fields',
      };
      return;
    }

    const user = await prisma.user.findUnique({
      where: { 
        email: data.email 
      },
    });

    if (user) {
      ctx.status = 400;
      ctx.response.body = {
        success: false,
        message: 'Email already exists',
      };
      return;
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: bcrypt.hashSync(data.password, 10),
          isAdmin: true,
          active: true,
        }
      });

      ctx.response.status = 201;
      ctx.response.body = {
        success: true,
        message: 'Create a new user',
        user: newUser,
      };
    } catch (err) {
      ctx.status = 500;
      ctx.response.body = {
        success: false,
        message: 'Internal server error', 
        error: err,
      }
    }
  }

  async update(ctx: Koa.Context) {
    const id = parseInt(ctx.params.id);
    const data = <UserRequest>ctx.request.body;

    const userExist = findUser(id);

    if (!userExist) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: 'User not found'
      };
      return;
    }

    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },   
      });

      ctx.response.status = 200;
      ctx.response.body = {
        success: true,
        message: 'User updated successfully',
        user: user,
      };
    } catch (err) {
      ctx.status = 500;
      ctx.response.body = {
        success: false,
        message: 'Internal server error', 
        error: err,
      }
    }
  }

  async remove(ctx: Koa.Context) {
    const id = parseInt(ctx.params.id);
    
    const userExist = findUser(id);

    if (!userExist) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: 'User not found'
      };
      return;
    }

    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });

      ctx.response.status = 200;
      ctx.response.body = {
        success: true,
        message: 'User deleted successfully',
      };
    } catch (err) {
      ctx.status = 500;
      ctx.response.body = {
        success: false,
        message: 'Internal server error', 
        error: err,
      };
    }
  }
}