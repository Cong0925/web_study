
//加载 fs  模块
const fs = require('fs');

// 调用方法读取文件  测试时 控制台 进入当前目录  node XXXXX.js
//fs.readFile('../resources/txt1.txt', (err, data) => {
//  if (err) {
//    throw err
//  }
//  else {
//    console.log(data.toString())
//  }
//})

//使用 Promise 封装
const p = new Promise((resolve, reject) => {
  fs.readFile('../resources/txt1.txt', (err, data) => {
    if (err) {
      reject(err)
    }
    else {
      resolve(data)
    }
  })
})

p.then((value) => {
  console.log(value.toString());
}, (reason) => {
  console.log('error');
})