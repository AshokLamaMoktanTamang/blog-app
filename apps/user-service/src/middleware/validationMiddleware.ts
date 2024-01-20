import { Context, Next } from 'koa';
import validator, { Joi } from 'koa-context-validator';

export const userRegistrationValidation = async (ctx: Context, next: Next) => {
  try {
    const { error } = Joi.object({
      userName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).validate(ctx.request.body);

    if (error) {
      return (ctx.body = { message: error.message || 'Internal Server Error' });
    }

    await next();
  } catch (error) {
    error.status = 400;
    return (ctx.body = { message: 'Internal Server Error' });
  }
};
