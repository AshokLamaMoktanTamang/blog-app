const path = require('path');
const shell = require('shelljs');
const rimraf = require('rimraf');

const PROTO_DIR = path.join(__dirname, '../proto');
let MODEL_DIR = path.join(__dirname, './models');

rimraf.sync(`${MODEL_DIR}/*`);

shell.exec(
  './node_modules/.bin/grpc_tools_node_protoc ' +
    `--grpc_out="grpc_js:${MODEL_DIR}" ` +
    `--js_out="import_style=commonjs,binary:${MODEL_DIR}" ` +
    `--ts_out="grpc_js:${MODEL_DIR}" ` +
    `--proto_path ${PROTO_DIR} ${PROTO_DIR}/*.proto`
);
