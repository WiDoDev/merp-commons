import { JSONCodec, NatsConnection, AckPolicy, PullOptions } from "nats";
import { MSEventInterface } from "./ms-event";
import { natsConnectionService } from "./nats-connection-service";

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

  public async subscribe(subject: string, readerName: string) {

    const js = this.nc.jetstream();

    const subOptions = {
      config: {
        name: readerName,
        durable_name: readerName,
        ack_policy: AckPolicy.Explicit,
      },
    };

    let sub = await js.subscribe(subject, subOptions);

    return sub; // TODO use rxjs to create an observable

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
    }
  }
}
