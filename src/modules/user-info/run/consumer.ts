import runConsumer from '../consumers';

const TOPIC_NAME = "user-profile-test";
const run = async () => {
    console.log("USER INFO CONSUMER");

    while(true) {
        await runConsumer(TOPIC_NAME);
    }
    
}
run();