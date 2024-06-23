import {PostgresDB} from '../../../core/pg';
import logger from '../../../core/logger';
import {faker} from "@faker-js/faker";

export const storeData = async (data: object) => {
    try {
        const pg = await (new PostgresDB()).connect();

        const sql = {
            text: `INSERT INTO users("fullName", "userName", email, password, status, "updatedAt", "createdAt") VALUES($1, $2, $3, $4, $5, $6, $7)`,
            values: Object.values(data),
        }
        const result = await pg.client?.query(sql);
        logger.info(`Create user data succeed: `, JSON.stringify(result));
    } catch (err) {
        logger.error('ERROR: ', JSON.stringify(err));
    }
}

// (async() => {
//     console.log('START');
//     await createData({
//         "fullName": faker.internet.displayName(),
//         "userName": faker.internet.userName(),
//         "email": faker.internet.email(),
//         "password": faker.internet.password(),
//         "status": true,
//         "updatedAt": "2021-05-14T01:39:47.525Z",
//         "createdAt": "2021-05-14T01:39:47.525Z"
//     });
// })();