import { kafkaConnectionService } from './kafka-connection-service';
import { MSEventInterface } from './ms-event';
import { Producer } from 'kafkajs';

export class KafkaEventService {
  private static instance: KafkaEventService;

  private constructor(private producer: Producer) {}

  public static async getInstance(): Promise<KafkaEventService> {
    if (!KafkaEventService.instance) {
      const producer = kafkaConnectionService.producer;
      KafkaEventService.instance = new KafkaEventService(producer);
    }
    return KafkaEventService.instance;
  }

  public async emit(event: MSEventInterface) {
    const subject = event.getSubject();
    const emitter = event.getEmitter();
    const data = event.getData();

    const jsonValue = {
      emitter,
      data,
    };

    const message = {
      value: JSON.stringify(jsonValue),
    };
    await this.producer.send({
      topic: subject,
      messages: [message],
    });
  }
}
