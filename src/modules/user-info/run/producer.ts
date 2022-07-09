import runProducer from '../producers';

const TOPIC_NAME = "user-profile-test";
const run = async () => {
    console.log("START USER INFO CONSUMER");
    await runProducer(TOPIC_NAME);
}
run();