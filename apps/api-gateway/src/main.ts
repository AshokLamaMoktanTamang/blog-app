import koa from 'koa';
import Router from 'koa-router';

import { config } from './config';

const host = config.apiGateway.host;
const port = config.apiGateway.port;

const app = new koa();
const router = new Router();

app.use(async (ctx) => {
  ctx.body = { message: 'Hello API' };
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
