// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var user_pb = require('./user_pb.js');

function serialize_LoginRequest(arg) {
  if (!(arg instanceof user_pb.LoginRequest)) {
    throw new Error('Expected argument of type LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LoginRequest(buffer_arg) {
  return user_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_LoginResponse(arg) {
  if (!(arg instanceof user_pb.LoginResponse)) {
    throw new Error('Expected argument of type LoginResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LoginResponse(buffer_arg) {
  return user_pb.LoginResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RegisterRequest(arg) {
  if (!(arg instanceof user_pb.RegisterRequest)) {
    throw new Error('Expected argument of type RegisterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RegisterRequest(buffer_arg) {
  return user_pb.RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RegisterResponse(arg) {
  if (!(arg instanceof user_pb.RegisterResponse)) {
    throw new Error('Expected argument of type RegisterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RegisterResponse(buffer_arg) {
  return user_pb.RegisterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  register: {
    path: '/UserService/Register',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.RegisterRequest,
    responseType: user_pb.RegisterResponse,
    requestSerialize: serialize_RegisterRequest,
    requestDeserialize: deserialize_RegisterRequest,
    responseSerialize: serialize_RegisterResponse,
    responseDeserialize: deserialize_RegisterResponse,
  },
  login: {
    path: '/UserService/Login',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.LoginRequest,
    responseType: user_pb.LoginResponse,
    requestSerialize: serialize_LoginRequest,
    requestDeserialize: deserialize_LoginRequest,
    responseSerialize: serialize_LoginResponse,
    responseDeserialize: deserialize_LoginResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
