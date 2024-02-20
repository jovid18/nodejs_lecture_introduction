import express from 'express';
import Todo from '../schemas/todo.schemas.js';
const router = express.Router();

// 할일 등록 API

router.post('/todos', async (req, res, next) => {
  const { value } = req.body;

  if (!value) {
    return res
      .status(400)
      .json({ errorMessage: '해야할 일(value) 데이터가 존재하지 않습니다.' });
  }
  const todoMaxOrder = await Todo.findOne().sort('-order').exec();
  const order = todoMaxOrder ? todoMaxOrder.order + 1 : 1;
  const todo = new Todo({ value, order });
  await todo.save();

  return res.status(201).json({ todo: todo });
});

//해야할 일 목록 조회 API
router.get('/todos', async (req, res, next) => {
  const todos = await Todo.find().sort('-order').exec();
  return res.status(200).json({ todos: todos });
});

//해야할 일 순서 변경 API

export default router;
