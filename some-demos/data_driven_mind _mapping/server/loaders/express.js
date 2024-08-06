const cors = require("cors");// 导入cors中间件 允许跨域
const express = require("express");//导入express
const bodyParser = require('body-parser');// 导入body-parser中间件 解析post请求的body数据

const expressLoader = async (app) => {

  // 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  // 配置解析 application/json 格式的请求体数据的中间件
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // 将cors注册为全局中间件
  app.use(cors()); //不传参默认允许简单跨域和预检跨域
  // 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
  app.use(express.urlencoded({ extended: false }));

  return app
}

module.exports = { expressLoader }
