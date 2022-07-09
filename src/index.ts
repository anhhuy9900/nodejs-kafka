import express from 'express';
import routes from './modules';

const app = express();
app.use('/', routes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Nodejs-Kafka server started");
});