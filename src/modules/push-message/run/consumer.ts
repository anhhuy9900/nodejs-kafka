import {KafkaConsumer} from '../../../core/kafka-consumer';
import logger from '../../../core/logger';
import {
    PUSH_EACH_MESSAGE_TOPIC_NAME,
    PUSH_EACH_MESSAGE_GROUP_ID,
    PUSH_BATCH_MESSAGE_TOPIC_NAME,
    PUSH_BATCH_MESSAGE_GROUP_ID
} from '../../../share/constants';

const runConsumerForEachMessage = async () => {
    const kafkaConsumer = new KafkaConsumer(PUSH_EACH_MESSAGE_GROUP_ID, PUSH_EACH_MESSAGE_TOPIC_NAME);
    await kafkaConsumer.start();
    await kafkaConsumer.process((value: Record<string, any>, heartbeat?: () => Promise<void>) => {
        logger.info('INFO', 'CONSUMER DATA FOR EACH:', value);
        if (heartbeat) heartbeat();
    });
};

// const runConsumerForBatchMessage = async () => {
//     const kafkaConsumer = new KafkaConsumer(PUSH_BATCH_MESSAGE_GROUP_ID, PUSH_BATCH_MESSAGE_TOPIC_NAME);
//     await kafkaConsumer.start();
//     await kafkaConsumer.process((value: Record<string, any>, heartbeat?: () => Promise<void>) => {
//         logger.info('INFO', 'CONSUMER DATA FOR BATCH: ', value);
//         if (heartbeat) heartbeat();
//     });
// };

(async () => {
    logger.info('RUN CONSUMER', '======== START ========')
    await runConsumerForEachMessage();
})();