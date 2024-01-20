import Router from 'koa-router';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { config } from '../config';
import {
  validateRequestBody,
  RegistrationSchema,
  LoginSchema,
} from '../middleware/validationMiddleware';

interface RegisterRequestBody {
  userName: string;
  email: string;
  password: string;
}

interface CustomContext {
  request: {
    body: RegisterRequestBody;
  };
}

const router = new Router<{}, CustomContext>();

router.post(
  '/api/register',
  validateRequestBody(RegistrationSchema),
  async (ctx) => {
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
  }
);

router.post('/api/login', validateRequestBody(LoginSchema), async (ctx) => {
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
});

export default router;
