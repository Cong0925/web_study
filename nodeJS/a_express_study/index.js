const express = require('express')
const { singers } = require('./singerInfo.json')

const app = express()

app.get('/', (req, res) => {
  // 原生操作
  // console.log(req.method);
  // console.log(req.url);
  // console.log(req.httpVersion);
  // console.log(req.headers);

  // express 操作
  // console.log(req.path);
  // console.log(req.query);
  console.log(req.ip);
  console.log(req.get('host'));
  res.end('this is home')
})

// 响应头设置 练习
app.get('/setResHeader', (req, res) => {
  //原生响应
  //res.statusCode 404;
  //res.statusMessage 'love';
  //res.setHeader('xxx','yyy');
  //res.write('hello express '
  //res.end('response');

  //express响应
  res.status(500);
  res.set('aaa', 'bbb');
  res.send('你好 Express');
})

// 一些其他响应练习
app.get('/other', (req, res) => {
  //跳转响应
  // res.redirect('http://atguigu.com');

  //下载响应
  // res.download(__dirname + '/package.json');

  //JS0N响应
  // res.json({
  //   name: '尚硅谷',
  //   s1ogon: '让天下没有难学的技术'
  // })
  
  //响应文件内容
  res.sendFile(__dirname + '/html1.html');
})

// 练习获取 url 里的参数
app.get('/:id.html', (req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  res.end(req.params.id + '详情')
})

// 接收 post  请求方式
app.post('/login', (req, res) => {
  res.end('this is login')
})

// 动态返回 指定查询内容
app.get('/singer/:id.html', (req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  let id = req.params.id
  let result = singers.find(item => {
    if (item.id === Number(id)) {
      return true
    }
  })
  if (!result) {
    res.statusCode = 404
    res.end('404 Not Found')
  }
  res.end(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset='utf-8'>
    <title>前端学习</title>
  </head>
  <body>
    <h1>name:${result.name}</h1>
    <h1>other_name:${result.other_name}</h1>
    <h1>id:${result.id}</h1>
  </body>
  </html>
  `)
})


// 所有请求方式
app.all('/allPage', (req, res) => {
  res.end('this is allPage')
})
// 兜底的请求
app.all('*', (req, res) => {
  res.statusCode = 404
  res.end('404 Not Found')
})
app.listen(9000, () => {
  console.log('server start...')
})

