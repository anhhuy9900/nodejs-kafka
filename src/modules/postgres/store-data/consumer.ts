import * as _ from 'lodash';
import {KafkaConsumer} from '../../../core/kafka-consumer';
import logger from '../../../core/logger';
import {
    PG_HANDE_DATA_GROUP_ID, PG_HANDE_DATA_TOPIC_NAME,
} from '../../../share/constants';
import {storeData} from "../store-data/store-data";

interface IConsumer {
    consumeBatchMessage(): Promise<void>;
    consumeMessage(): Promise<void>;
}

export class Consumer implements IConsumer {
    protected kafkaConsumer: KafkaConsumer

    constructor() {
        this.kafkaConsumer = new KafkaConsumer(PG_HANDE_DATA_GROUP_ID, PG_HANDE_DATA_TOPIC_NAME);
    }

    async start() {
        await this.kafkaConsumer.start()
        logger.info('RUN CONSUMER', '======== START ========')
        await this.consumeMessage();
    }


    async consumeMessage() {
        await this.kafkaConsumer.process(async (value: Record<string, any>, heartbeat?: () => Promise<void>) => {
            logger.info('INFO', 'CONSUMER DATA FOR BATCH: ', JSON.stringify(value));
            await storeData(_.omit(value, ['id']));
            if (heartbeat) await heartbeat();
        });
    }

    async consumeBatchMessage() {

    }
}

(async () => {
    const consumer = new Consumer();
    logger.info('RUN CONSUMER', '======== START ========')
    await consumer.start();
})();