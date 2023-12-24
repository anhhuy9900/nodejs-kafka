import runProducer from '../producers';
import { USER_PROFILE_TOPIC_NAME } from '../../../../share/constants';

(async () => {
    console.log("START USER INFO CONSUMER");
    await runProducer(USER_PROFILE_TOPIC_NAME);
})();