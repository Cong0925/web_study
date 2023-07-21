const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const express = require('express')
const { singers } = require('../a_express_study/singerInfo.json')

const app = express()
app.set('view engine','ejs')
app.set('views',path.resolve(__dirname,'./views'))



// 动态返回 所有歌手信息
app.get('/singer', (req, res) => {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  let result = singers
  if (!result) {
    res.statusCode = 404
    res.end('404 Not Found')
  }
  res.render('html2',{singer:singers})
})

// 动态返回 指定查询内容
app.get('/singer/:id', (req, res) => {
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
  res.render('index',{
    name:result.name,
    other_name:result.other_name,
    id:result.id
  })
})


// 兜底的请求
app.all('*', (req, res) => {
  res.statusCode = 404
  res.end('404 Not Found')
})
app.listen(9000, () => {
  console.log('server start...')
})

