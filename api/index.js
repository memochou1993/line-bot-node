import express from 'express';
import { reply } from '../services/line.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/webhook', async (req, res) => {
  const events = req.body.events || [];
  const replies = events
    .filter(({ type }) => type === 'message')
    .map(({ replyToken, message }) => reply({
      replyToken,
      messages: [
        {
          type: 'text',
          text: message.text,
        },
      ],
    }));
  await Promise.all(replies);
  res.sendStatus(200);
});

app.listen(3000);

export default app;
