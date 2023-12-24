import { KafkaClient } from '../../../core/kafka-client';
import { TOPIC_NAME, TOPIC_NAME_2 } from '../constants';

const Consumer = KafkaClient.consumer({ groupId: 'group-instance2-' + Date.now() });

const runConsumer2 = async () => {
    await Consumer.connect();
    await Consumer.subscribe({ topics: [ TOPIC_NAME ], fromBeginning: true });
    // ConsumerInstance2.seek({
    //     topic: TOPIC_NAME, 
    //     partition: 1,
    //     offset: ''
    // });
    await Consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`========= CONSUMER INSTANCE 2 - TOPIC: ${TOPIC_NAME} ========`)
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

            Consumer.seek({
                topic, 
                partition,
                offset: (Number(message.offset) + 1).toString()
            });
        },
    });
};

export default runConsumer2;