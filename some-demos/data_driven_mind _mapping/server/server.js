// app.js
const loaders = require('./loaders'); // 模块加载器
const express = require("express");//导入express

async function startServer() {
  // 创建express服务器实例
  const app = express();
  const port = 8888
  // 通过 loaders 初始化各个模块
  await loaders.init(app);

  // 启动服务器
  app.listen(port, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`api server running at 127.0.0.1: ${port}`);
  });
}
startServer();