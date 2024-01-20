import Router from 'koa-router';
import User from '../models/user';
import validator, { Joi } from 'koa-context-validator';

interface RegisterRequestBody {
  username: string;
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
  '/register',
  validator({
    body: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  async (ctx) => {
    try {
      const { username, email, password } = ctx.request.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        ctx.status = 400;
        ctx.body = { message: 'Email already in use' };
        return;
      }

      const newUser = new User({ username, email, password });
      await newUser.save();

      ctx.status = 201;
      ctx.body = { message: 'User registered successfully' };
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = { message: 'Internal Server Error' };
    }
  }
);

export default router;
