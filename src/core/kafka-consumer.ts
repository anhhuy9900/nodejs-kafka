import {Consumer, KafkaClient} from "./kafka-client";
import * as Kafkajs from 'kafkajs'
import logger from './logger';
import KafkaService from '../core/kafka-service';

export class KafkaConsumer {
    protected consumer: Kafkajs.Consumer;
    protected topicName: string;
    private groupId: string;

    constructor(groupId: string, topicName: string) {
        this.topicName = topicName;
        this.consumer = KafkaClient.consumer({ groupId });
        this.groupId = groupId;
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
            // autoCommit: true,
            // autoCommitInterval: 5000, // Commit offsets every 5 seconds
            // autoCommitThreshold: 100, // Commit offsets after processing 100 messages
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
                } catch (error: any) {
                    logger.error(`KafkaConsumer - Error processing message: %f`, error?.message);
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

    async startConsumer(topic: string, groupId: string) {
        const consumer: Kafkajs.Consumer = await KafkaService.getConsumer(groupId);
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: true });

        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    logger.info(`Received message: %s`, message.value?.toString());
                } catch (error: any) {
                    logger.error(`Error processing message: %s`, error.message);
                    setTimeout(() => this.startConsumer(topic, groupId), 5000); // Retry after 5 seconds
                }
            },

            eachBatch: async ({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary }) => {
                logger.info(`Processing batch of %s messages...`, batch.messages.length);

                for (const message of batch.messages) {
                    try {
                        const value = message.value?.toString();
                        logger.info(`Processing message: %s`, value);

                        // Simulate processing delay (e.g., saving to DB)
                        if (value) {
                            await this.processMessage(value);
                        }
                        resolveOffset(message.offset);
                        await commitOffsetsIfNecessary();
                    } catch (error: any) {
                        logger.error(`Error processing message: %s`, error.message);
                    }
                }

                await heartbeat(); // Maintain connection with Kafka
            }
        });

        process.on('SIGINT', async () => {
            await consumer.disconnect();
            process.exit(0);
        });
    }

    async processMessage(message: string) {
        // Simulate heavy processing (e.g., database storage, calling an API)
        return new Promise(resolve => setTimeout(resolve, 100)); // Simulated delay
    }
}