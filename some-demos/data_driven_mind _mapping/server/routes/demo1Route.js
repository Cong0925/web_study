// routes/adminRoute.js
const express = require('express');
const router = express.Router();
const { generateMdFromTree } = require('../utils/dealData');

router.post("/generateMindMap", generateMindMap);

// 处理生成思维导图的请求
async function generateMindMap(req, res) {
  const data = req.body.data;

  try {
    let result = await generateMdFromTree(data);
    res.status(200).send(result);
  } catch (err) {
    res.status(200).send(err);
  }
}



module.exports = router;