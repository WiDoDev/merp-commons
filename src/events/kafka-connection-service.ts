import {
  Kafka,
  ProducerConfig,
  ConsumerConfig,
  Producer,
  Consumer,
  Admin,
  AdminConfig,
} from 'kafkajs';
import { msConfig } from '../config/ms-config';

class KafkaProducerConnectionService {
  private _producer?: Producer;
  private _kafka?: Kafka;

  public get producer(): Producer {
    if (!this._producer) {
      throw new Error('Cannot access Kafka Producer client before connecting');
    }

    return this._producer;
  }

  public async connect(config?: ProducerConfig) {
    this._kafka = new Kafka({
      clientId: msConfig.kafkaClientId,
      brokers: msConfig.kafkaBrokers,
    });
    const producer = this._kafka.producer(config);
    await producer.connect();
    this._producer = producer;
  }

  public consumer(config: ConsumerConfig): Consumer {
    if (!this._kafka) {
      throw new Error('Cannot access Kafka client before connecting');
    }
    return this._kafka.consumer(config);
  }

  public admin(config?: AdminConfig): Admin {
    if (!this._kafka) {
      throw new Error('Cannot access Kafka client before connecting');
    }
    return this._kafka.admin(config);
  }
}

export const kafkaConnectionService = new KafkaProducerConnectionService();
