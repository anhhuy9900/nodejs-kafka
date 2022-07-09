import { Consumer } from '../../../config/kafka';
const runConsumer = async () => {
    await Consumer.connect();
    await Consumer.subscribe({ topic: 'my-topic', fromBeginning: true });
    await Consumer.run({
        // autoCommit: true,
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received message `, { 
                topic, 
                partition, 
                offset: message.offset,
                value: message.value ? message.value.toString('utf8') : null
            });
        },
    });
};

export default runConsumer;