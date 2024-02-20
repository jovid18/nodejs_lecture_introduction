// app.js

import express from 'express';
import goodsRouter from './routes/goods.js';
import newsRouter from './routes/news.js';
import connect from './schemas/index.js';
const app = express();
const PORT = 3000;

connect(); //MongoDB 연결하기 위한 커넥트 함수를 실행한다.

//json 형태로 서버에 body 데이터를 전달하며느 req.body 데이터를 읽을 수 있게함
app.use(express.json());
//form content type에서 body 데이터를 전달하면, req.body 데이터를 반환하게 함
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', [goodsRouter, newsRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
