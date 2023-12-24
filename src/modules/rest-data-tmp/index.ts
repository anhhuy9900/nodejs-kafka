import express, { Request, Response } from "express";
import { sendMessage } from './producers';
import { v4 as uuidv4 } from 'uuid';
import { Producer } from '../../core/kafka-client';
import { TOPIC_NAME, TOPIC_NAME_2 } from './constants';

const app = express.Router();


app.post("/add", async (req: Request, res: Response) => {
    console.log("req.body: ", req.body);
    await Producer.connect();
    for(let i = 0; i < 10; i++) {
      await sendMessage(
        {
          topicName: TOPIC_NAME, 
          body: JSON.stringify({
            num: i,
            id: uuidv4(),
            ...req.body
          }),
          // partition: 1
        }
      )
    }

    res.send({ status: 'Added data success' })
});

app.post("/add-2", async (req: Request, res: Response) => {
  console.log("req.body: ", req.body);
  await Producer.connect();
  for(let i = 0; i < 10; i++) {
    await sendMessage(
      {
        topicName: TOPIC_NAME_2, 
        body: JSON.stringify({
          id: uuidv4(),
          ...req.body
        })
      }
    )
  }

  res.send({ status: 'Added data success' })
});

export default app;