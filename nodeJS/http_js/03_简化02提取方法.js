// 1.引入HTTP模块
const http = require('http')

// 2.创建服务对象
const server = http.createServer((request, response) => {
  let url = new URL(request.url, 'http://127.0.0.1')
  //输出路径
  console.log(url.pathname);
  //输出keyword查询字符串
  console.log(url.searchParams.get('num'))
  response.end('url new');
})

// 3.监听端口，启动服务
server.listen(9000, () => {
  console.log('server start...');
})