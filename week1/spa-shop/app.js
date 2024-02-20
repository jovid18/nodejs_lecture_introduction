// app.js

import express from 'express';
import goodsRouter from './routes/goods.js';
import newsRouter from './routes/news.js';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', [goodsRouter, newsRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
