import {Client} from '@elastic/elasticsearch';
import {MappingProperty, PropertyName} from "@elastic/elasticsearch/lib/api/types";
import {ELASTIC_URL, ELASTIC_USERNAME, ELASTIC_PASSWORD} from '../config'


export class ElasticSearch {

    client: Client;

    constructor() {
        this.client = this.connect();
    }

    connect() {
        this.client = new Client({
            // cloud: {
            //   id: ELASTIC_CLOUD_ID,
            // },
            node: ELASTIC_URL,
            auth: {
                username: ELASTIC_USERNAME,
                password: ELASTIC_PASSWORD
            },
        });

        return this.client;
    }

    info() {
        this.client?.info()
            .then(response => console.log(response))
            .catch(error => console.error(error))
    }

    async createIndex(indexName: string, properties: Record<PropertyName, MappingProperty>) {
        // await this.client?.indices.create({ index: indexName });
        //  operations: {
        //      mappings: {
        //          properties: {
        //              id: { type: 'integer' },
        //              text: { type: 'text' },
        //              user: { type: 'keyword' },
        //              time: { type: 'date' }
        //          }
        //      }
        //  }
        await this.client?.indices.create({
            index: indexName,
            mappings: { properties  }
        }, {ignore: [400]})
        console.log("Index created");
    };
}