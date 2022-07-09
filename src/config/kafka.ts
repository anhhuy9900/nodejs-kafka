import { Kafka } from 'kafkajs';

const KafkaClient = new Kafka({
    // clientId: 'my-app',
    brokers: ['localhost:9092'],
});
const Consumer = KafkaClient.consumer({ groupId: 'my-group-' + Date.now() });
const Producer = KafkaClient.producer({
    // requiredAcks: 1,
   // maxInFlightRequests: 1,
    idempotent: true,
    transactionalId: 'my-transactional-id',
});

export { Consumer, Producer };