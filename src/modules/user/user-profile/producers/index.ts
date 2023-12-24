import reader from 'readline-sync';
import { v4 as uuidv4 } from 'uuid';
import { KafkaProducer } from '../../../../core/kafka-producer';
import { generateData } from '../../../../share/data';

const kafkaProducer = new KafkaProducer();
const sendMessage = async (topicName: string, input: string) => {
    try {
        await kafkaProducer.send(topicName, [
            {
                key: '1',
                value: input
            },
            {
                key: '2' ,
                value: input
            }
        ])
    } catch (error) {
        console.log("Caught sendMessage while sending:", error);
    }
};

const runProducer = async (topicName: string) => {

    await kafkaProducer.start();

    while (true) {
        const input = reader.question('Enter a message: ');
        if (input === 'exit') {
            process.exit(0);
        }
        try {
            await sendMessage(topicName, JSON.stringify(generateData()));
        } catch (error) {
            console.log("Caught runProducer while sending:", error);
        }
    }
};

export default runProducer;
