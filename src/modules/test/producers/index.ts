import reader from 'readline-sync';
import { Producer } from '../../../config/kafka';

const sendMessage = async (input: string) => {
    try {
        await Producer.send({
            topic: 'my-topic',
            messages: [{ key: 'test', value: input }],
        })
    } catch (error) {
        console.log("Caught sendMessage while sending:", error);
    }
};

const runProducer = async () => {
    await Producer.connect();

    while(true) {
        let input = await reader.question("Data: ");
        if (input === 'exit') {
            process.exit(0);
        }
        try {
            await sendMessage(input);
        } catch (error) {
            console.log("Caught runProducer while sending:", error);
        }
    }
};

export default runProducer;
