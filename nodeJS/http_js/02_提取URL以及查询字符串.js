// 1.引入HTTP模块
const http = require('http')
const url = require('url')

// 2.创建服务对象
const server = http.createServer((request, response) => {
  let res = url.parse(request.url,true)
  let pathName = res.pathname
  let query = res.query

  console.log(query)
})

// 3.监听端口，启动服务
server.listen(9000, () => {
  console.log('server start...');
})