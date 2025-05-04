import * as _ from 'lodash';
import {KafkaConsumer} from '../../../core/kafka-consumer';
import logger from '../../../core/logger';
import {
    ES_STORE_DATA_GROUP_ID,
    ES_STORE_DATA_TOPIC_NAME,
} from '../../../share/constants';
import {storeDataToES} from '../handle-data/create-data';

interface IConsumer {
    consumeBatchMessage(): Promise<void>;
    consumeMessage(): Promise<void>;
}

export class Consumer implements IConsumer {
    protected kafkaConsumer: KafkaConsumer

    constructor() {
        this.kafkaConsumer = new KafkaConsumer(ES_STORE_DATA_GROUP_ID, ES_STORE_DATA_TOPIC_NAME);
    }

    async start() {
        await this.kafkaConsumer.start()
        logger.info('RUN CONSUMER', '======== START ========')
        await this.consumeBatchMessage();
    }


    async consumeMessage() {
        //@TODO
    }

    async consumeBatchMessage() {
        await this.kafkaConsumer.process(async (value: Record<string, any>, heartbeat?: () => Promise<void>) => {
            logger.info('INFO', 'CONSUMER DATA FOR BATCH: ', JSON.stringify(value));
            await storeDataToES(value);
            if (heartbeat) await heartbeat();
        });
    }
}

(async () => {
    const consumer = new Consumer();
    logger.info('RUN CONSUMER', '======== START ========')
    await consumer.start();
})();