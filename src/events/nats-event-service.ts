import {
  JSONCodec,
  NatsConnection,
  Nanos,
  ConsumerConfig,
  consumerOpts,
  JetStreamSubscription,
} from "nats";
import { MSEventInterface } from "./ms-event";
import { natsConnectionService } from "./nats-connection-service";
export interface NatsSubscriptionOptions {
  subject: string;
  queueGroup: string;
  ackWait?: Nanos;
  config?: Partial<ConsumerConfig>;
}
export class NatsEventService {
  private static instance: NatsEventService;

  private constructor(private nc: NatsConnection) {}

  public static async getInstance(): Promise<NatsEventService> {
    if (!NatsEventService.instance) {
      const nc = natsConnectionService.client;
      NatsEventService.instance = new NatsEventService(nc);
    }
    return NatsEventService.instance;
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

  public async subscribe(
    options: NatsSubscriptionOptions
  ): Promise<JetStreamSubscription> {
    const js = this.nc.jetstream();

    const opts = consumerOpts({
      ack_wait: options.ackWait || 30 * 10 ** 9, // 30s by default
    });
    opts.queue(options.queueGroup);
    opts.durable(options.queueGroup);
    opts.deliverTo(options.queueGroup);
    opts.manualAck();

    const res = await js.subscribe(options.subject, opts);
    return res;
  }

  public async pullSubscribe() {}

  public async registerStreams(
    name: string,
    globalSubject: string,
    subjects: string[]
  ): Promise<void> {
    const jsm = await this.nc.jetstreamManager();
    let checkStreamExist = false;

    try {
      await jsm.streams.find(globalSubject);
      checkStreamExist = true;
    } catch (error) {
      checkStreamExist = false;
    }

    if (!checkStreamExist) {
      await jsm.streams.add({
        name: name,
        subjects: subjects,
      });
    } else {
      // find a stream that stores a specific subject:
      const name = await jsm.streams.find(globalSubject);

      // retrieve info about the stream by its name
      const si = await jsm.streams.info(name);

      // update a stream configuration
      si.config.subjects = subjects;
      await jsm.streams.update(si.config);
    }
  }
}
