// 1.引入HTTP模块
const http = require('http')

// 2.创建服务对象
const server = http.createServer((request, response) => {
  // response.end('hello http server !!!')

  // response.setHeader('content-type','text/html;charset=utf-8');
  // response.end('你好！')

  // 获取请求头
  // //获取请求的方法
  // console.log(request.method);
  // //获取请求的ur1
  // console.log(request.url);
  // //获取HTTP协议的版本号
  // console.log(request.httpVersion);
  // //获取HTTP的请求头
  // console.log(request.headers);

  // 获取请求体
  //1.声明一个变量
  let body = ''
  // 2.绑定data事件
  request.on('data', chunk => {
    body += chunk;
  })
  //3.绑定end事件
  request.on('end', () => {
    console.log(body);
    //响应
    response.end('Hello HTTP');
  });

})

// 3.监听端口，启动服务
server.listen(9000, () => {
  console.log('server start...');
})