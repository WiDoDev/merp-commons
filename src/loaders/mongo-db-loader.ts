import mongoose from 'mongoose';
import { msConfig } from '../config/ms-config';

class MongoDbLoaderSrv {
  public async init() {
    try {
      await mongoose.connect(msConfig.mongoDbUrl);
      console.log('Connected to MongoDb');
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export const MongoDbLoader = new MongoDbLoaderSrv();
