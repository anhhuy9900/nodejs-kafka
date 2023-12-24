import express from 'express';
import bodyParser from 'body-parser';
import testPostPlaceholder from '../src/modules/test/test-post-placeholder';
import restDatTmp from '../src/modules/rest-data-tmp';

const routes = express.Router();

routes.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
routes.use(bodyParser.json());
routes.use('/test', testPostPlaceholder);
routes.use('/rest-data-tmp', restDatTmp);

const app = express();
app.use('/', routes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Nodejs-Kafka server started");
});