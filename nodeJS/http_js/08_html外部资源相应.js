// 1.引入HTTP模块
const http = require('http');
const fs = require('fs')
const path = require('path')

// 2.创建服务对象
const server = http.createServer((request, response) => {
  let { pathname } = new URL(request.url, 'http://127.0.0.1')
  if (pathname === '/') {
    let p = path.resolve(__dirname, '../html/Http_js_08配套.html')
    let html = fs.readFileSync(p)
    response.end(html)


  } else if (pathname === '/css_js/http_js_08CSS.css') {
    let p = path.resolve(__dirname, '../css_js/http_js_08CSS.css')
     let css = fs.readFileSync(p)
    response.end(css)


  } else if (pathname === '/css_js/http_js_08JS.js') {
    let p = path.resolve(__dirname, '../css_js/http_js_08JS.js')
    let js = fs.readFileSync(p)
    response.end(js)


  } else {
    response.statusCode = 404
    response.end('<h1>404 Not Found</h1>')
  }



})

// 3.监听端口，启动服务
server.listen(9000, () => {
  console.log('server start...');
})