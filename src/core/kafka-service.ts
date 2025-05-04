import { Kafka, Consumer, Producer } from 'kafkajs';
import { KAFKA_URL, KAFKA_CLIENT_ID } from '../config';

class KafkaService {
  private kafka: Kafka;
  private producer: Producer;
  private consumers: Map<string, Consumer> = new Map();

  constructor() {
    this.kafka = new Kafka({ clientId: KAFKA_CLIENT_ID, brokers: [KAFKA_URL] });
    this.producer = this.kafka.producer({ idempotent: true });
  }

  async getConsumer(groupId: string): Promise<Consumer> {
    if (!this.consumers.has(groupId)) {
      const consumer = this.kafka.consumer({ groupId });
      this.consumers.set(groupId, consumer);
    }
    return this.consumers.get(groupId)!;
  }

  getProducer(): Producer {
    return this.producer;
  }
}

export default new KafkaService();
