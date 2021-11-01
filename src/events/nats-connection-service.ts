import { connect, NatsConnection } from 'nats';
import { msConfig } from '../config';

class NatsConnectionService {
    private _client?: NatsConnection;

    public get client(): NatsConnection {
        if (!this._client) {
          throw new Error('Cannot access NATS client before connecting');
        }
    
        return this._client;
    }
  
    public async connect() {
        this._client = await connect({ servers: msConfig.natsUrl });
    }
}

export const natsConnectionService = new NatsConnectionService();