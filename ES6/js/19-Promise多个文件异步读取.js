
//加载 fs  模块
const fs = require('fs');
const { resolve } = require('path');

// 调用方法读取文件  测试时 控制台 进入当前目录  node XXXXX.js
//fs.readFile('../resources/txt1.txt', (err, data1) => {
//  fs.readFile('../resources/txt2.txt', (err, data2) => {
//    fs.readFile('../resources/txt3.txt', (err, data3) => {
//      let res = data1 + data2 + data3
//      console.log(res)
//    })
//  })
//})

//使用 Promise 封装
// const p = new Promise((resolve, reject) => {
//   fs.readFile('../resources/txt1.txt', (err, data) => {
//     if (err) {
//       reject(err)
//     }
//     else {
//       resolve(data)
//     }
//   })
// })

// p.then((value) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile('../resources/txt2.txt', (err, data) => {
//       if (err) {
//         reject(err)
//       }
//       else {
//         resolve([value, data])
//       }
//     })
//   })
// }, (reason) => {
//   console.log('error1');
// })
//   .then((value) => {
//     return new Promise((resolve, reject) => {
//       fs.readFile('../resources/txt3.txt', (err, data) => {
//         if (err) {
//           reject(err)
//         }
//         else {
//           value.push(data)
//           resolve(value)
//         }
//       })
//     })
//   }, (reason) => {
//     console.log('error2');
//   })
//   .then(value => {
//     console.log(value.join(''));
//   }, reason => {
//     console.log('error3');

//   })


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
const p1 = new Promise((resolve, reject) => {
  fs.readFile('../resources/txt1.txt', (err, data) => {
    if (err) {
      reject(err)
    }
    else {
      resolve(data)
    }
  })
})
const p2 = new Promise((resolve, reject) => {
  fs.readFile('../resources/txt1.txt', (err, data) => {
    if (err) {
      reject(err)
    }
    else {
      resolve(data)
    }
  })
})

const res = Promise.all([p,p1,p2])

