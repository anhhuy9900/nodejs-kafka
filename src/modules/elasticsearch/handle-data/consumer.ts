import * as _ from 'lodash';
import {KafkaConsumer} from '../../../core/kafka-consumer';
import logger from '../../../core/logger';
import {
    ES_STORE_DATA_GROUP_ID,
    ES_STORE_DATA_TOPIC_NAME,
} from '../../../share/constants';
import { createData } from '../handle-data/create-data';

const runConsumerForBatchMessage = async () => {
    const kafkaConsumer = new KafkaConsumer(ES_STORE_DATA_GROUP_ID, ES_STORE_DATA_TOPIC_NAME);
    await kafkaConsumer.start();
    await kafkaConsumer.process(async (value: Record<string, any>, heartbeat?: () => Promise<void>) => {
        logger.info('INFO', 'CONSUMER DATA FOR BATCH: ', JSON.stringify(value));
        await createData(value);
        if (heartbeat) await heartbeat();
    });
};

(async () => {
    logger.info('RUN CONSUMER', '======== START ========')
    await runConsumerForBatchMessage();
})();