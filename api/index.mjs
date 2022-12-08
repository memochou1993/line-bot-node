import express from 'express';
import { reply } from './api.mjs';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/webhook', async (req, res) => {
  const events = req.body.events || [];
  for (const event of events) {
    const { type, replyToken, message } = event;
    if (type === 'message') {
      await reply({
        replyToken,
        messages: [
          {
            type: 'text',
            text: message.text,
          },
        ],
      })
    }
  }
  res.sendStatus(200);
});

export default app;
