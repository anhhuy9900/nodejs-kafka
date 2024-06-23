import { Producer } from "./kafka-client";
import *  as Kafkajs from 'kafkajs'
import logger from './logger';

export class KafkaProducer {
    protected producer: Kafkajs.Producer;

    constructor() {
        this.producer = Producer;
    }

    async start(): Promise<void> {
       try {
           await Producer.connect();
           Producer.on('producer.connect', (event: Kafkajs.ConnectEvent) => {
               logger.info('INFO','KafkaProducer - producer.connect: ', event)
           })
           Producer.on('producer.disconnect', (event: Kafkajs.DisconnectEvent) => {
               logger.info('INFO','KafkaProducer - producer.disconnect: ', event)
           })
       } catch (err) {
           logger.error('KafkaProducer - start- error: ', err)
       }
    }

    async send(topicName: string, messages: Kafkajs.Message[]): Promise<Kafkajs.RecordMetadata[]> {
        const data = await Producer.send({
            topic: topicName,
            messages,
        });
        // data
        // [
        //   {
        //     topicName: 'push-message',
        //     partition: 0,
        //     errorCode: 0,
        //     baseOffset: '79',
        //     logAppendTime: '-1',
        //     logStartOffset: '0'
        //   }
        // ]
        logger.info('INFO','KafkaProducer - send - data : ', JSON.stringify((data)))
        return data;
    }

    async sendBatch(topicMessages: Kafkajs.TopicMessages[]): Promise<Kafkajs.RecordMetadata[]> {
        const data = await Producer.sendBatch({
            topicMessages,
        });
        logger.info('INFO','KafkaProducer - sendBatch - data : ', JSON.stringify((data)))
        return data;
    }
}