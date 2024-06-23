import { PostgresDB } from '../../../core/pg';
import logger from '../../../core/logger';

const generateData = async() => {
    try {
        const pg = await (new PostgresDB()).connect();

        const sql = `
        CREATE TABLE IF NOT EXISTS "users" (
            \t id serial PRIMARY KEY,
            \t "fullName" VARCHAR ( 255 ) NOT NULL,
            \t "userName" VARCHAR ( 255 ) NOT NULL,
            \t email VARCHAR ( 255 ) UNIQUE NOT NULL,
            \t status  BOOLEAN NOT NULL DEFAULT FALSE,
            \t password VARCHAR ( 255 ) NOT NULL,
            \t "updatedAt" TIMESTAMP NOT NULL,
            "createdAt" TIMESTAMP NOT NULL
        )`;
        const result = await pg.client?.query(sql);
        logger.info(`Create table users succeed: `, result);
    } catch (err) {
        console.log('ERROR: ', err);
    }
}

(async() => {
    console.log('START');
    await generateData();
})();