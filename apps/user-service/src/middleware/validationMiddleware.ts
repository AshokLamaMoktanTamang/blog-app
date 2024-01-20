import { Context, Next } from 'koa';
import { Joi } from 'koa-context-validator';

export const validateRequestBody =
  (validationObject: Joi.ObjectSchema<any>) =>
  async (ctx: Context, next: Next) => {
    try {
      const { error } = validationObject.validate(ctx.request.body);

      if (error) {
        return (ctx.body = {
          message: error.message || 'Internal Server Error',
        });
      }

      await next();
    } catch (error) {
      error.status = 400;
      return (ctx.body = { message: 'Internal Server Error' });
    }
  };

export const RegistrationSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const LoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});


