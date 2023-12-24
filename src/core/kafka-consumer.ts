import {Consumer, KafkaClient} from "./kafka-client";
import *  as Kafkajs from 'kafkajs'
import logger from './logger';

export class KafkaConsumer {
    protected consumer: Kafkajs.Consumer;
    protected topicName: string;

    constructor(groupId: string, topicName: string) {
        this.topicName = topicName;
        this.consumer = KafkaClient.consumer({ groupId });
    }

    async start(): Promise<void> {
        await this.consumer.connect();
        await this.consumer.subscribe({
            topic: this.topicName,
            fromBeginning: true
        });
    }

    async process(cb: (value: Record<string, any>, heartbeat?: () => Promise<void>) => void): Promise<void> {
        await this.consumer.run({
            autoCommit: true,
            eachMessage: async ({ topic, partition, message, heartbeat }: Kafkajs.EachMessagePayload): Promise<void> => {
                logger.info('START: ', '=====================================================')
                logger.info('INFO', `KafkaConsumer - eachMessage - Received message: `, JSON.stringify({
                    topic,
                    partition,
                    offset: message.offset,
                    value: message.value
                }));
                let value = message.value ? message.value.toString() : null;
                try {
                    value = value ? JSON.parse(value) : null;
                    logger.info('INFO',`KafkaConsumer - message received: `, JSON.stringify(value));
                    // if you want to commit offset by myself, and then you need enable this code
                    // await this.consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }]);
                    cb(value as unknown as Record<string, any>, heartbeat);
                } catch (error) {
                    logger.error('KafkaConsumer - ERROR: ', error);
                }

            },
            eachBatch: async ({ batch, heartbeat, resolveOffset }: Kafkajs.EachBatchPayload): Promise<void> => {
                logger.info('INFO', '=====================================================', '')
                logger.info('INFO', `KafkaConsumer - eachMessage - Received message: `, JSON.stringify({
                    topic: batch.topic,
                    partition: batch.partition,
                    offset: batch.lastOffset(),
                    batchLength: batch.messages?.length
                }));
                try {
                    logger.info('INFO',`KafkaConsumer - message received:`, JSON.stringify(batch.messages));
                    // if you want to commit offset by myself, and then you need enable this code
                    // await this.consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }]);
                    cb(batch.messages as unknown as Record<string, any>, heartbeat);
                } catch (error) {
                    logger.error('KafkaConsumer - ERROR: ', error);
                }

            },
        });
    }
}