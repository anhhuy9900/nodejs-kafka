import reader from 'readline-sync';
import { v4 as uuidv4 } from 'uuid';
import { Producer } from '../../config/kafka';

const sendMessage = async (topicName: string, input: string) => {
    try {
        await Producer.send({
            topic: topicName,
            messages: [{ key: uuidv4() , value: input }],
        })
    } catch (error) {
        console.log("Caught sendMessage while sending:", error);
    }
};

const runProducer = async (topicName: string) => {
    await Producer.connect();

    while(true) {
        const input = reader.question('Enter a message: ');
        if (input === 'exit') {
            process.exit(0);
        }
        try {
            const data = {
                "id": `u-${uuidv4()}`,
                "fullName": "FullName - " + input,
                "userName": "Username - " + input,
                "email": "Multi-lateralOdie87@example.com",
                "password": "qrV65zlyO9JrieE",
                "status": true,
                "updatedAt": "2021-05-14T01:39:47.525Z",
                "createdAt": "2021-05-14T01:39:47.525Z"
            }
            await sendMessage(topicName, JSON.stringify(data));
        } catch (error) {
            console.log("Caught runProducer while sending:", error);
        }
    }
};

export default runProducer;
