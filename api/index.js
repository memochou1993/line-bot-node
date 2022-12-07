const https = require('https');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/api', (req, res) => {
  res.sendStatus(200);
});

app.post('/api/webhook', (req, res) => {
  res.send('HTTP POST request sent to the webhook URL!');

  console.log(req.body.events);

  if (req.body.events[0].type === 'message') {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
    };

    const body = JSON.stringify({
      replyToken: req.body.events[0].replyToken,
      messages: [
        {
          type: 'text',
          text: `${req.body.events[0].message.text} (${(new Date()).toLocaleTimeString('en-US', { hour12: false })})`,
        },
      ],
    });

    const webhookOptions = {
      hostname: 'api.line.me',
      path: '/v2/bot/message/reply',
      method: 'POST',
      headers,
      body,
    };

    const request = https.request(webhookOptions, (res) => {
      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });

    request.on('error', (err) => {
      console.error(err);
    });

    request.write(body);

    request.end();
  }
});

app.listen(80);
