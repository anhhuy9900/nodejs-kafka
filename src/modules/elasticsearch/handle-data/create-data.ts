import {ElasticSearch} from '../../../core/eslasticsearch';
import logger from '../../../core/logger';
import {faker} from "@faker-js/faker";
import { v4 as uuidv4 } from 'uuid';
import { ES_HANDLE_DATA_INDEX } from './constants';

const elastic = new ElasticSearch();

export const storeDataToES = async (document: object) => {
    try {
        const result = await elastic.client.create({
            index: ES_HANDLE_DATA_INDEX,
            id: uuidv4(),
            document
        })
        logger.info(`Create elk kafka data succeed: `, JSON.stringify(result));
    } catch (err) {
        logger.error('ERROR: ', JSON.stringify(err));
    }
}