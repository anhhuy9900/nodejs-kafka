import { Kafka, Consumer, Producer, Partitioners } from 'kafkajs';
// import { v4 as uuidv4 } from 'uuid';
const KafkaClient = new Kafka({
    // clientId: 'my-app',
    brokers: ['localhost:9092']
});
const Consumer: Consumer = KafkaClient.consumer({groupId: 'group-test-1'});
const Producer: Producer = KafkaClient.producer({
    // requiredAcks: 1,
    // maxInFlightRequests: 1,
    idempotent: true,
    transactionalId: 'transactional-id',
    createPartitioner: Partitioners.LegacyPartitioner
});

export {KafkaClient, Consumer, Producer};