const express = require('express')
const { singers } = require('./singerInfo.json')
const fs = require('fs')
const path = require('path')
const app = express()

// 静态资源中间件
app.use(express.static(__dirname+'/publish'))

// 全局中间件
const recordCenterCom = (req,res,next) => {
  let {url ,ip} = req
  fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url} ${ip}\r\n`)
  next()
}
app.use(recordCenterCom)

app.get('/home', (req, res) => {
  res.send('this is home')
})

// 声明路由中间件
const checkQuery = (req,res,next) => {
  if(req.query.code === '2000'){
    next()
  }else{
    res.send('ERROR')
  }
}

// 路由中间件 练习
app.get('/admin',checkQuery, (req, res) => {
  res.send('this is admin')
  
})
app.get('/setting',checkQuery, (req, res) => {
  res.send('this is setting')
})




app.all('*', (req, res) => {
  res.send('<h1>404 Not Found</h1>')
})

app.listen(9000, () => {
  console.log('server start...')
})

