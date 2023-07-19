// 1.引入HTTP模块
const http = require('http');

// 2.创建服务对象
const server = http.createServer((request, response) => {
    response.setHeader('content-type','text/html;charset=utf-8');

    let {method} = request
    let {pathname} = new URL(request.url,'http://127.0.0.1')
    if(method === 'GET' && pathname === '/login'){
      let data = {
        code:2000,
        name:'xhc',
        state:1
      }
      response.write(JSON.stringify(data))
      response.end()
    }else if(method === 'GET' && pathname === '/register'){
      response.end('注册界面')
    }else{
      response.statusCode = 404
      response.end('Not Found')
    }

})

// 3.监听端口，启动服务
server.listen(9000, () => {
  console.log('server start...');
})