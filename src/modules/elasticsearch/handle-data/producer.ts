import {v4 as uuidv4} from 'uuid';
import logger from '../../../core/logger';
import {KafkaProducer} from '../../../core/kafka-producer';
import {generateData, getFakeUserAPI} from './build-data';
import {ES_STORE_DATA_GROUP_ID, ES_STORE_DATA_TOPIC_NAME} from '../../../share/constants';

// const kafkaProducer = new KafkaProducer();
// const sendMessageWithGenerateData = async(): Promise<void> => {
//     await kafkaProducer.send(ES_STORE_DATA_TOPIC_NAME, [{
//         key: uuidv4(),
//         timestamp: `${Date.now()}`,
//         value: JSON.stringify(generateData()),
//     }])
// }
//
// const sendMessageFakeAPIData = async(): Promise<void> => {
//     const userId = Math.round(Math.random() * 200);
//     const data = await getFakeUserAPI(userId);
//     await kafkaProducer.send(ES_STORE_DATA_TOPIC_NAME, [{
//         key: uuidv4(),
//         timestamp: `${Date.now()}`,
//         value: JSON.stringify(data),
//     }])
// }
//
// const runProducer = async() => {
//     await kafkaProducer.start();
//     setInterval(async () => {
//         try {
//             await sendMessageFakeAPIData()
//         } catch (error) {
//             logger.error('Caught sendMessage while sending', error)
//         }
//     }, 1000)
// };

interface IProducer {
    sendMessageWithGenerateData(): Promise<void>;
    sendMessageFakeAPIData(): Promise<void>;
    start(): Promise<void>
}

export class Producer implements IProducer {
    protected kafkaProducer: KafkaProducer

    constructor() {
        this.kafkaProducer = new KafkaProducer();
    }

    async sendMessageWithGenerateData() {
        await this.kafkaProducer.send(ES_STORE_DATA_TOPIC_NAME, [{
            key: uuidv4(),
            timestamp: `${Date.now()}`,
            value: JSON.stringify(generateData()),
        }])
    }

    async sendMessageFakeAPIData() {
        const userId = Math.round(Math.random() * 200);
        const data = await getFakeUserAPI(userId);
        await this.kafkaProducer.send(ES_STORE_DATA_TOPIC_NAME, [{
            key: uuidv4(),
            timestamp: `${Date.now()}`,
            value: JSON.stringify(data),
        }])
    }

    async start() {
        await this.kafkaProducer.start();
        setInterval(async () => {
            try {
                await this.sendMessageFakeAPIData()
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
