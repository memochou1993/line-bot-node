import express from 'express';
import { reply } from './api.mjs';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/webhook', (req, res) => {
  res.sendStatus(200);

  (req.body.events || [])
    .filter(({ type }) => type === 'message')
    .forEach(({ replyToken, message }) => {
      reply({
        replyToken,
        messages: [
          {
            type: 'text',
            text: message.text,
          },
        ],
      });
    });
});

app.listen(80);
