import express from 'express';

const router = express.Router();

//routes/goods.js
//상품 예시 데이터
const goods = [
  {
    goodsId: 1,
    name: '상품 1',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg',
    category: 'drink',
    price: 6.2,
  },
  {
    goodsId: 2,
    name: '상품 2',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg',
    category: 'drink',
    price: 0.11,
  },
  {
    goodsId: 3,
    name: '상품 3',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg',
    category: 'drink',
    price: 2.2,
  },
  {
    goodsId: 4,
    name: '상품 4',
    thumbnailUrl:
      'https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg',
    category: 'drink',
    price: 0.1,
  },
];
//상품 목록 조회 API
router.get('/goods', (req, res) => {
  return res.status(200).json({
    goods: goods,
  });
});

router.get('/goods/:goodsId', (req, res) => {
  const goodsId = req.params.goodsId;
  const findGoods = goods.find((item) => item.goodsId == goodsId);
  return res.status(200).json({
    goods: findGoods,
  });
});

//상품 등록 API
router.post('/goods', (req, res) => {
  const { name, thumbnailUrl, category, price } = req.body;
  const goodsId = goods[goods.length - 1].goodsId + 1;
  const newGoods = {
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  };
  goods.push(newGoods);
  return res.status(200).json({
    goods: newGoods,
  });
});

export default router;
