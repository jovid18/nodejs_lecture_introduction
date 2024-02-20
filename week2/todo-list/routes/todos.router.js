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
router.patch('/todos/:todoId', async (req, res, next) => {
  const { todoId } = req.params;
  const { order, done, value } = req.body;

  //현재 나의 order가 무엇인지 알아야한다.
  const currentTodo = await Todo.findById(todoId).exec();
  if (!currentTodo) {
    return res
      .status(404)
      .json({ errorMessage: '존재하지 않는 해야할 일 입니다.' });
  }

  if (order) {
    const targetTodo = await Todo.findOne({ order }).exec();
    if (targetTodo) {
      targetTodo.order = currentTodo.order;
      await targetTodo.save();
    }
    currentTodo.order = order;
  }
  if (done !== undefined) {
    currentTodo.doneAt = done ? new Date() : null;
  }
  if (value) {
    currentTodo.value = value;
  }
  await currentTodo.save();

  return res.status(200).json({});
});

router.delete('/todos/:todoId', async (req, res, next) => {
  const { todoId } = req.params;
  const todo = await Todo.findById(todoId).exec();
  if (!todo) {
    return res
      .status(404)
      .json({ errorMessage: '존재하지 않는 해야할 일입니다.' });
  }

  await Todo.deleteOne({ _id: todoId }).exec();
  return res.status(200).json({});
});

export default router;
