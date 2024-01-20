import Router from 'koa-router';

import {
  validateRequestBody,
  RegistrationSchema,
  LoginSchema,
} from '../middleware/validationMiddleware';

import registerController, { CustomContext } from '../controller/register';
import loginController from '../controller/login';

const router = new Router<{}, CustomContext>();

router.post(
  '/api/register',
  validateRequestBody(RegistrationSchema),
  registerController
);

router.post('/api/login', validateRequestBody(LoginSchema), loginController);

export default router;
