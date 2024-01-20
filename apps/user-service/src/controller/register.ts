import User from '../models/user';
import { Context, Request } from 'koa';

interface RegisterRequestBody {
  userName: string;
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
    const { userName, email, password } = ctx.request.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      ctx.status = 400;
      ctx.body = { message: 'Email already in use' };
      return;
    }

    const newUser = new User({ userName, email, password });
    await newUser.save();

    ctx.status = 201;
    ctx.body = { message: 'User registered successfully' };
  } catch (error) {
    console.log('Error', error);

    ctx.status = 500;
    ctx.body = { message: 'Internal Server Error' };
  }
};
