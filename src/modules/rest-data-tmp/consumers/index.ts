import { Consumer } from '../../../core/kafka-client';
import { TOPIC_NAME } from '../constants';

const runConsumer = async () => {
    await Consumer.connect();
    await Consumer.subscribe({ topics: [ TOPIC_NAME ], fromBeginning: true, });
    await Consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`========= CONSUMER 1 - TOPIC: ${TOPIC_NAME} ========`)
            let value = message.value ? message.value.toString() : null ;
            try {
                value = value ? JSON.parse(value) : null;

            } catch (error) {
                console.error(error);
            }
            console.log(`Received message `, { 
                topic, 
                partition, 
                offset: message.offset,
                value: message.value ? value : null
            });

            // await Consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }]);
        },
    });
};

export default runConsumer;