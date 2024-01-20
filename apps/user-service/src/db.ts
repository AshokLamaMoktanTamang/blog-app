import mongoose from 'mongoose';
import { config } from './config';

const connect = () => {
  mongoose
    .connect(config.dbUri)
    .then(() => {
      console.log('Connected to mongodb');
    })
    .catch(() => {
      console.log('Failed to connect to db');
    });
};

export default connect;
