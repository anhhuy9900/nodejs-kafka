import {KafkaClient} from "../core/kafka-client";

(async () => {
    try {
        const admin = KafkaClient.admin();
        await admin.connect().then(res => {
            console.log('Connected with kafka ', res)
        })

        await admin.disconnect();
    } catch (err) {
        console.error('Failed to connect to Kafka:', err);
    }
})()