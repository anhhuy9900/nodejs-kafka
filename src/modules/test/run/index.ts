import runConsumer from '../consumers';
import runProducer from '../producers';

const run = async () => {
    console.log("START NODEJS KAFKA TEST");

    await runProducer();
    await runConsumer();
}
run();