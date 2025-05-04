import {v4 as uuidv4} from 'uuid';
import logger from '../../../core/logger';
import {KafkaProducer} from '../../../core/kafka-producer';
import {generateData} from '../../../share/data';
import {PG_HANDE_DATA_TOPIC_NAME} from "../../../share/constants";

interface IProducer {
    sendMessage(): Promise<void>;
    start(): Promise<void>
}

export class Producer implements IProducer {
    protected kafkaProducer: KafkaProducer

    constructor() {
        this.kafkaProducer = new KafkaProducer();
    }

    async sendMessage() {
        await this.kafkaProducer.send(PG_HANDE_DATA_TOPIC_NAME, [{
            key: uuidv4(),
            timestamp: `${Date.now()}`,
            value: JSON.stringify(generateData()),
        }])
    }

    async start() {
        await this.kafkaProducer.start();
        setInterval(async () => {
            try {
                await this.sendMessage()
            } catch (error) {
                logger.error('Caught sendMessage while sending', error)
            }
        }, 1000)
    }
}

(async () => {
    const producer = new Producer();
    logger.info('RUN PRODUCER: ', '======== START ========')
    await producer.start()
})();
