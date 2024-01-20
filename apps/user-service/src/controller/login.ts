import { Context, Request } from 'koa';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { config } from '../config';

interface RegisterRequestBody {
  email: string;
  password: string;
}

export interface CustomContext extends Context {
  request: Request & {
    body: RegisterRequestBody;
  };
}

export default async (ctx: CustomContext) => {
  try {
    const { email, password } = ctx.request.body;

    const user = await User.findOne({ email });

    if (!user) {
      ctx.status = 401;
      ctx.body = { message: 'Invalid credentials' };
      return;
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      ctx.status = 401;
      ctx.body = { message: 'Invalid credentials' };
      return;
    }

    const token = jwt.sign({ userId: user._id }, config.secretKey, {
      expiresIn: '7h',
    });

    ctx.status = 200;
    ctx.body = { message: 'Login successful', token };
  } catch (error) {
    console.error('Error', error);
    ctx.status = 500;
    ctx.body = { message: 'Internal Server Error' };
  }
};
