import * as _ from 'lodash';
import {KafkaConsumer} from '../../../core/kafka-consumer';
import logger from '../../../core/logger';
import {
    PG_HANDE_DATA_GROUP_ID,
    PG_HANDE_DATA_TOPIC_NAME,
} from '../../../share/constants';
import { storeData } from './store-data';

// const runConsumerForEachMessage = async () => {
//     const kafkaConsumer = new KafkaConsumer(PUSH_EACH_MESSAGE_GROUP_ID, PUSH_EACH_MESSAGE_TOPIC_NAME);
//     await kafkaConsumer.start();
//     await kafkaConsumer.process((value: Record<string, any>, heartbeat?: () => Promise<void>) => {
//         logger.info('INFO', 'CONSUMER DATA FOR EACH:', value);
//         if (heartbeat) heartbeat();
//     });
// };

const runConsumerForBatchMessage = async () => {
    const kafkaConsumer = new KafkaConsumer(PG_HANDE_DATA_GROUP_ID, PG_HANDE_DATA_TOPIC_NAME);
    await kafkaConsumer.start();
    await kafkaConsumer.process(async (value: Record<string, any>, heartbeat?: () => Promise<void>) => {
        logger.info('INFO', 'CONSUMER DATA FOR BATCH: ', JSON.stringify(value));
        await storeData(_.omit(value, ['id']));
        if (heartbeat) await heartbeat();
    });
};

(async () => {
    logger.info('RUN CONSUMER', '======== START ========')
    await runConsumerForBatchMessage();
})();