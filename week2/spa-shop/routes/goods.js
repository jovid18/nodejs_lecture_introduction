import express from 'express';

const router = express.Router();
import Goods from '../schemas/goods.js';

import mongoose from 'mongoose';
router.post('/goods', async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;
  const goods = await Goods.find({ goodsId: goodsId }).exec();
  if (goods.length) {
    return res
      .status(400)
      .json({ errorMessage: '이미 존재하는 데이터입니다.' });
  }
  const createGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });
  return res.status(201).json({ goods: createGoods });
});

export default router;
