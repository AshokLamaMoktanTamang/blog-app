import koa from 'koa';
import { config } from './config';

const host = config.host;
const port = config.port;

const app = new koa();

app.use(async (ctx) => {
  ctx.body = { message: 'Hello API' };
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
