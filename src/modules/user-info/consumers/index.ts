import { Consumer } from '../../config/kafka';
const runConsumer = async (topicName: string) => {
    await Consumer.connect();
    await Consumer.subscribe({ topic: topicName, fromBeginning: true, });
    await Consumer.run({
        // autoCommit: true,
        eachMessage: async ({ topic, partition, message }) => {
            
            let value = message.value ? message.value.toString() : null ;
            try {
                value = value ? JSON.parse(value) : null;
                console.log(`Message received: ${value}`);
                // await User.create(data);
            } catch (error) {
                console.error(error);
            }
            console.log(`Received message `, { 
                topic, 
                partition, 
                offset: message.offset,
                value: message.value ? value : null
            });
        },
    });
};

export default runConsumer;