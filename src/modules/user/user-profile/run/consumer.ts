import runConsumer from '../consumers';
import { USER_PROFILE_TOPIC_NAME } from '../../../../share/constants';

(async () => {
    console.log("======= USER INFO CONSUMER =========");
    console.log(1111);

    while(true) {
        await runConsumer(USER_PROFILE_TOPIC_NAME);
    }
    
})();