// 1.引入HTTP模块
const http = require('http');
const fs = require('fs')
const path = require('path')

// 2.创建服务对象
const server = http.createServer((request, response) => {
  let p = path.resolve(__dirname,'../html/Http_js_07配套.html')
  // let html = fs.readFileSync(p)
  fs.readFile(p,(err,data)=>{
    if(err){
      console.log('读取失败');
      return
    }
    response.end(data)
  })
  
})

// 3.监听端口，启动服务
server.listen(9000, () => {
  console.log('server start...');
})