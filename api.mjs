import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.line.me',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
  },
});

/**
 * @param {string} replyToken
 * @param {Array<Object>} messages
 * @param {string} messages[].type
 * @param {string} messages[].text
 */
export const reply = ({
  replyToken,
  messages,
}) => instance.post('/v2/bot/message/reply', {
  replyToken,
  messages,
});

export default null;
