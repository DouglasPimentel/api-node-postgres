import dotenv from 'dotenv';

dotenv.config();

export default {
  APP_NAME: process.env.APP_NAME || 'My App Name',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5438/postgres?schema=public',
  JWT_SECRET: process.env.JWT_SECRET || 'shhh',
}
