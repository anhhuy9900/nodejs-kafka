import dotenv from 'dotenv';
import path from 'path';

const config = dotenv.config({ path: path.resolve(__dirname, '../../.env') }).parsed;

export const APP_PORT = config?.APP_PORT || null;
export const MONGO_URI = config?.MONGO_URI || '';
export const ELASTIC_URL = config?.ELASTIC_URL || '';
export const ELASTIC_CLOUD_ID = config?.ELASTIC_CLOUD_ID || '';
export const ELASTIC_USERNAME = config?.ELASTIC_USERNAME || '';
export const ELASTIC_PASSWORD = config?.ELASTIC_PASSWORD || '';
export const KAFKA_URL = config?.KAFKA_URL || '';
// POSTGRES
export const PG_HOST = config?.PG_HOST || '';
export const PG_PORT = (config?.PG_PORT) as unknown as number;
export const PG_DATABASE = config?.PG_DATABASE || '';
export const PG_USERNAME = config?.PG_USERNAME || '';
export const PG_PASSWORD = config?.PG_PASSWORD || '';