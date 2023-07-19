// 1.引入HTTP模块
const http = require('http');
const fs = require('fs')
const path = require('path')

// 浏览器 访问 http://127.0.0.1:9000/css_js/http_js_08CSS.css
// http://127.0.0.1:9000/css_js/http_js_08JS.js
// http://127.0.0.1:9000/html/html1.html
// http://127.0.0.1:9000/html/Http_js_09_require.html

let mimes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  json: 'application/json'
}

// 2.创建服务对象
const server = http.createServer((request, response) => {
  // response.setHeader('content-type', 'text/html;charset=utf-8');
  if (request.method !== 'GET') {
    response.statusCode = 405;
    response.end('<h1>405 Method Not Allowed</h1>')
  }

  let { pathname } = new URL(request.url, 'http://127.0.0.1')

  let filePath = path.resolve(__dirname, '../')
  filePath += pathname

  fs.readFile(filePath, (err, data) => {
    if (err) {
      switch (err.code) {
        case 'ENOENT': // 找不到
          response.statusCode = 404;
          response.end('<h1>404 Not Found !</h1>');
        case 'EPERM': //没有访问权限
          response.statusCode = 403;
          response.end('<h1>403 Forbidden</h1>');
        default:
          response.statusCode = 500;
          response.end('<h1>Internal Server Error</h1>');
      }
      return
    }

    //获取文件的后缀名
    let ext = path.extname(filePath).slice(1);
    //获取对应的类型
    let type = mimes[ext];
    if (type) {
      //匹配到了
      if (ext === 'html') {
        response.setHeader('content-type', type + ';charset=utf-8');
      } else {
        response.setHeader('content-type', type)
      }
    } else {
      //没有匹配到
      response.setHeader('content-type', 'application/octet-stream');
    }
    response.end(data)
  })

})

// 3.监听端口，启动服务
server.listen(9000, () => {
  console.log('server start...');
})