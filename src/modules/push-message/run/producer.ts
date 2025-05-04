import {v4 as uuidv4} from 'uuid';
import logger from '../../../core/logger';
import {KafkaProducer} from '../../../core/kafka-producer';
import {generateData} from '../../../share/data';
import { PUSH_EACH_MESSAGE_TOPIC_NAME, PUSH_BATCH_MESSAGE_TOPIC_NAME } from '../../../share/constants';

const kafkaProducer = new KafkaProducer();
const sendMessage = async(): Promise<void> => {
    await kafkaProducer.send(PUSH_EACH_MESSAGE_TOPIC_NAME, [{
        key: uuidv4(),
        timestamp: `${Date.now()}`,
        value: JSON.stringify(generateData()),
    }])
}

const sendBatchMessage = async(): Promise<void> => {
    await kafkaProducer.sendBatch([{
        topic: PUSH_BATCH_MESSAGE_TOPIC_NAME,
        messages: Array.from(Array(10)).map(() => ({
            key: uuidv4(),
            timestamp: `${Date.now()}`,
            value: JSON.stringify(generateData()),
        }))
    }])
}
const runProducer = async() => {

    await kafkaProducer.start();

    setInterval(async () => {
        try {
            await sendBatchMessage()
        } catch (error) {
            logger.error('Caught sendMessage while sending', error)
        }
    }, 2000)
};

(async () => {
    logger.info('RUN PRODUCER: ', '======== PUSH DATA ========')
    await runProducer()
})();
