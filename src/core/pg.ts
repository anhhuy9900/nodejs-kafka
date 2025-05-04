import { Client } from 'pg'
import { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } from '../config';

export class PostgresDB {
    client?: Client;
    constructor() {
    }

    async connect() {
        if (!this.client) {
            this.client = new Client({
                host: PG_HOST,
                port: PG_PORT,
                database: PG_DATABASE,
                user: PG_USERNAME,
                password: PG_PASSWORD,
            })
            await this.client.connect();
        }

        return this;
    }
}