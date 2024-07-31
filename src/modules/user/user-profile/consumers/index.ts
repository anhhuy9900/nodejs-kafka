import { KafkaConsumer } from '../../../../core/kafka-consumer';
const runConsumer = async (topicName: string) => {
    const kafkaConsumer = new KafkaConsumer('group-user-profile', topicName);
    await kafkaConsumer.start();
    await kafkaConsumer.process((value: Record<string, any>) => {
        console.log('USER-PROFILE - consume data:', value);
    });
};
export default runConsumer;