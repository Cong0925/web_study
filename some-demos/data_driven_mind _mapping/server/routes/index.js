// routes/index.js
const express = require('express');
const router = express.Router();

// 引入路由
const demo1 = require('./demo1Route');
const demo2 = require('./reciveFile');

// 路由注册
router.use('/', demo1);
router.use('/', demo2);


// 导出路由
module.exports = router;