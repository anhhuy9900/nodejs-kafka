import express from 'express';
import bodyParser from 'body-parser';
import testPostPlaceholder from './test/test-post-placeholder';

const routes = express.Router();

routes.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
routes.use(bodyParser.json());
routes.use('/test', testPostPlaceholder);

export default routes;