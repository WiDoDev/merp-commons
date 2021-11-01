import dotenv from 'dotenv';
import { randomBytes } from 'crypto';
dotenv.config();

export interface MSConfig {
  msName: string;
  mongoDbUrl: string;
  msSignature: string;
  version: string;
  natsUrl: string;
}

export const msConfig: MSConfig = {
  msName: process.env.MS_NAME || 'ms',
  mongoDbUrl: process.env.MONGO_DB_URL || `mongodb://127.0.0.1:27017/${process.env.MS_NAME}`, 
  natsUrl: process.env.NATS_URL || '127.0.0.1:4222',
  msSignature: `${process.env.MS_NAME}.${randomBytes(3).toString('hex')}`,
  version: process.env.MS_VERSION || 'v0.0.1',
};
