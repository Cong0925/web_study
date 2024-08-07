// app.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // 引入 index.js 文件

const app = express();
const port = 6666;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 使用挂载的路由
// const path = require('path')
// const pathUrl = path.join(__dirname, '../front')
// app.use(express.static(pathUrl))
app.use('/static', express.static("routes"))
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
