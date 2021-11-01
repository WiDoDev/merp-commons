import { JSONCodec, NatsConnection } from 'nats';
import { MSEventInterface } from './ms-event';
import { natsConnectionService } from './nats-connection-service';

export class NatsEventEmitter {
  private static instance: NatsEventEmitter;

  private constructor(private nc: NatsConnection) {}

  public static async getInstance(): Promise<NatsEventEmitter> {
    if (!NatsEventEmitter.instance) {
      const nc = natsConnectionService.client;
      NatsEventEmitter.instance = new NatsEventEmitter(nc);
    }
    return NatsEventEmitter.instance;
  }

  public async emit(event: MSEventInterface) {
    const subject = event.getSubject();
    const emitter = event.getEmitter();
    const data = event.getData();

    const jc = JSONCodec();
    const encodedData = jc.encode({
      emitter,
      data,
    });
    await this.nc.publish(subject, encodedData);
  }
}
