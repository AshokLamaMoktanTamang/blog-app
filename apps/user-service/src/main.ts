import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import grpc from 'grpc';
import * as grpcLoader from '@grpc/proto-loader';
import jwt from 'jsonwebtoken';
import path from 'path';

import userRouter from './routes/user';
import connectDb from './db';
import { config } from './config';

import User from './models/user';

const host = config.host;
const port = config.port;

connectDb();

const app = new koa();

app.use(bodyParser());

app.use(userRouter.routes());
app.use(userRouter.middleware());
app.use(userRouter.allowedMethods());

app.use(async (ctx) => {
  ctx.body = { message: 'Hello API' };
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

const packageDefinition = grpcLoader.loadSync(
  path.join(__dirname, './proto/user.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const userProto = grpc.loadPackageDefinition(packageDefinition);

interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  success: boolean;
  status: number;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token?: string;
  success: boolean;
  status: number;
}

const userService = {
  Register: async (
    call: grpc.ServerUnaryCall<RegisterRequest>,
    callback: grpc.sendUnaryData<RegisterResponse>
  ) => {
    try {
      const { userName, email, password } = call.request;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        callback(null, {
          message: 'Email already in use',
          status: 401,
          success: false,
        });
        return;
      }

      const newUser = new User({ userName, email, password });
      await newUser.save();

      callback(null, {
        message: 'User registered successfully',
        status: 200,
        success: true,
      });
    } catch (error) {
      callback(null, {
        message: 'Internal server Error',
        status: 500,
        success: false,
      });
    }
  },

  Login: async (
    call: grpc.ServerUnaryCall<LoginRequest>,
    callback: grpc.sendUnaryData<LoginResponse>
  ) => {
    try {
      const { email, password } = call.request;

      const user = await User.findOne({ email });

      if (!user) {
        callback(null, {
          message: 'Invalid credentials',
          status: 403,
          success: false,
        });
        return;
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        callback(null, {
          message: 'Invalid credentials',
          status: 403,
          success: false,
        });
        return;
      }

      const token = jwt.sign({ userId: user._id }, config.secretKey, {
        expiresIn: '7h',
      });

      callback(null, {
        message: 'Internal Server Error',
        status: 200,
        success: true,
        token,
      });
    } catch (error) {
      callback(null, {
        message: 'Internal Server Error',
        status: 500,
        success: false,
      });
    }
  },
};

const server = new grpc.Server();

server.addService((userProto.UserService as any).service, userService);

server.bind(`${host}:${port}`, grpc.ServerCredentials.createInsecure());
console.log(`gRPC Server running at ${host}:${port}`);
server.start();
