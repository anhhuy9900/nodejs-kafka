import { KafkaConsumer } from '../../../../core/kafka-consumer';
import {USER_PROFILE_GROUP_ID} from "../../../../share/constants";

const runConsumer = async (topicName: string) => {
    const kafkaConsumer = new KafkaConsumer(USER_PROFILE_GROUP_ID, topicName);
    await kafkaConsumer.start();
    await kafkaConsumer.process((value: Record<string, any>) => {
        console.log('USER-PROFILE - consume data:', value);
    });
};
export default runConsumer;