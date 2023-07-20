const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const app = express()


// 静态资源中间件
app.use((req, res, next) => {
  let referer = req.get('referer')
  console.log(referer)

  if (referer) {
    let url = new URL(referer)
    let hostname = url.hostname
    console.log(hostname)
    if (hostname !== '127.0.0.1') {
      res.statusCode = 404
      res.send('<h1>无权访问图片</h1>')
      return
    }
  }
  next()
});
app.use(express.static(__dirname+'/publish'))


app.listen(9000, () => {
  console.log('server start...')
})

