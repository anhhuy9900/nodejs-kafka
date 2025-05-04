import {ElasticSearch} from '../../../core/eslasticsearch';
import logger from '../../../core/logger';
import {faker} from "@faker-js/faker";
import { v4 as uuidv4 } from 'uuid';
import { ES_HANDLE_DATA_INDEX } from './constants';

export const createIndex = async () => {
    try {
        const elastic = new ElasticSearch();
        const result = await elastic.createIndex(ES_HANDLE_DATA_INDEX, {
            name: {
                type: 'text'
            },
            fullName: {
                type: 'text'
            },
            userName: {
                type: 'text'
            },
            email: {
                type: 'keyword'
            },
            password: {
                type: 'text'
            },
            status: {
                type: 'boolean'
            },
            updatedAt: {
                type: 'text'
            },
            createdAt: {
                type: 'text'
            },
        })
        logger.info(`Create user data succeed: `, JSON.stringify(result));
    } catch (err) {
        logger.error('ERROR: ', JSON.stringify(err));
    }
}

(async () => {
    await createIndex();
})()