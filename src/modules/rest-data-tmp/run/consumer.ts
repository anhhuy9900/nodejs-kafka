import runConsumer from '../consumers';
import runConsumer2 from '../consumers/consumer-2';

(async () => {
    console.log("======= DATA TMP CONSUMER =========");
    while(true) {
        await runConsumer();
        await runConsumer2();
    }
})();