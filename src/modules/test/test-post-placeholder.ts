import express from 'express';
import axios from 'axios';

const app = express.Router();

app.get("/test-post-placeholder", async (req, res) => {
    try {
        const resData = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        let data = resData.data;

        console.log("🚀 ~ file: test-post-placeholder.ts ~ NEW DATA: ", JSON.stringify(data[0], null, 2));
        try {
            data = JSON.stringify(JSON.parse(data), null, 2);
        } catch (error) {

        }
        res.header("Content-Type",'application/json');
        res.status(200).send(data);	
    } catch(err: any) {
        console.log("🚀 ~ file: test-post-placeholder.ts ~ line 25 ~ app.get ~ err", err);
        res.status(500).send({message: err.message});
    }
});

export default app;