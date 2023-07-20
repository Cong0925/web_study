const express = require('express')
const { singers } = require('./singerInfo.json')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const app = express()

//解析]SON格式的请求体的中间件
const jsonParser = bodyParser.json()
//解析querystring格式请求体的中间件
const urlencodedParser= bodyParser.urlencoded({extended:false})

// 静态资源中间件
app.use(express.static(__dirname+'/publish'))

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/publish/html1.html')
})

app.post('/login',urlencodedParser, (req, res) => {
  console.log(req.body);
  res.sendFile(__dirname + '/publish/index.html')
})

app.all('*', (req, res) => {
  res.send('<h1>404 Not Found</h1>')
})

app.listen(9000, () => {
  console.log('server start...')
})

