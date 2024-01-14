import reader from 'readline-sync';
import { v4 as uuidv4 } from 'uuid';
import { Producer } from '../../../core/kafka-client';
import { Message } from 'kafkajs';
// import { TOPIC_NAME } from '../constants.ts';

export type MessageType = {
    topicName: string, 
    body: string, 
    partition?: number
}
export const sendMessage = async ({ topicName, body, partition }: MessageType) => {
    try {
        let message: Message = { 
            key: uuidv4(), 
            value: body 
        };

        if (partition) {
            message = {
                ...message,
                partition: partition,
            }
        }

        await Producer.send({
            topic: topicName,
            messages: [message],
        })
    } catch (error) {
        console.log("Caught sendMessage while sending:", error);
    }
};
