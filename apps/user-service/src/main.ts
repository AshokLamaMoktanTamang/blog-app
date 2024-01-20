import koa from 'koa';
import bodyParser from 'koa-bodyparser';

import userRouter from './routes/user';
import connectDb from './db';
import { config } from './config';

const host = config.host;
const port = config.port;

connectDb();

const app = new koa();

app.use(bodyParser());

app.use(userRouter.routes);
app.use(userRouter.middleware());

app.use(async (ctx) => {
  ctx.body = { message: 'Hello API' };
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
